import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'components/molecules/Navbar/navbar';
import UserService from 'services/user-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import styles from '../../../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = window.location.pathname.split('/verify/')[1];

    const data = {};
    UserService.verifEditProfile(data, token)
      .then(() => {
        setIsLoading(false);
        router.push('/profile');
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Navbar />
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formProfile}>
              <div className={styles.TitleCenter}>
                Verification Update Profil
              </div>
              <div className={styles.containerAlready}>
                {isLoading ? (
                  <div className={styles.teksAlready}>
                    Please wait; we are still verifying for profile update.
                  </div>
                ) : (
                  <div className={styles.teksAlready}>
                    Profile update has been verified successfully.
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
