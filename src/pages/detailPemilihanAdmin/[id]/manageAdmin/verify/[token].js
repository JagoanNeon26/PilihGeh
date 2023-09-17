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
          await votingServices.joinAdmin(id, token);
          setIsLoading(false);
          router.push(`/detailPemilihan/${id}`);
        } catch (error) {
          setIsLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message,
          });
          const fetchedData = error.response?.data;
          setVerifStatus(fetchedData.message);
          // router.push(`/detailPemilihan/${id}`);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Join Admin</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Navbar />
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formProfile}>
              <div className={styles.TitleCenter}>Verification Join Admin</div>
              <div className={styles.containerAlready}>
                {isLoading ? (
                  <div className={styles.teksAlready}>
                    Please wait, we are still verifying for join voting.
                  </div>
                ) : (
                  <div className={styles.teksAlready}>
                    {verifStatus ===
                      'Tidak memiliki akses untuk join pemilihan!' ||
                    verifStatus === 'jwt must be provided'
                      ? 'Verification Failed'
                      : ' Your account has been join voting as voters successfully.'}
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
