import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'components/molecules/Navbar/navbar';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import styles from '../../../../../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [verifStatus, setVerifStatus] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const token = window.location.pathname.split('/verify/')[1];
        try {
          await votingServices.joinVoters(id, token);
          setIsLoading(false);
          router.push(`/detailPemilihan/${id}`);
        } catch (error) {
          setIsLoading(false);
          if (error.response && error.response.status === 500) {
            // intentionally left empty
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.response?.data?.message,
            });
          }
          const fetchedData = error.response?.data;
          setVerifStatus(fetchedData.message);
          router.push(`/menuPemilihan`);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Join Voters</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Navbar />
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formProfile}>
              <div className={styles.TitleCenter}>Verification Join Voters</div>
              <div className={styles.containerAlready}>
                {isLoading ? (
                  <div className={styles.teksAlready}>
                    Silahkan tunggu, saya sedang memverifikasi untuk join
                    pemilihan.
                  </div>
                ) : (
                  <div className={styles.teksAlready}>
                    {verifStatus ===
                      'Tidak memiliki akses untuk join pemilihan!' ||
                    verifStatus === 'jwt must be provided'
                      ? 'Verification Failed'
                      : 'Akun anda telah berhasil join pemilihan sebagai pemilih.'}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
