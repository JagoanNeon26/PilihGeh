import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'components/molecules/Navbar/navbar';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import styles from '../../../../../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const delay = 5000;
    const fetchData = async () => {
      const token = window.location.pathname.split('/verify/')[1];
      try {
        await votingServices.joinVoters(id, token);
        setIsLoading(false);
        router.push(`/detailPemilihanAdmin/${id}/manageVoters`);
      } catch (error) {
        setIsLoading(false);
        router.push(`/detailPemilihanAdmin/${id}/manageAdmin`);
      }
    };

    setTimeout(() => {
      fetchData();
    }, delay);
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
                    Please wait, we are still verifying for join voting.
                  </div>
                ) : (
                  <div className={styles.teksAlready}>
                    Your account has been join voting as voters successfully.
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
