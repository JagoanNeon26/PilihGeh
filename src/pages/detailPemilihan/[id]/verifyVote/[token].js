import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from 'components/molecules/Navbar/navbar';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import votingServices from 'services/voting-services';
import styles from '../../../../styles/Home.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const token = window.location.pathname.split('/verifyVote/')[1];
      votingServices
        .verifyVoteUsers(id, token)
        .then(() => {
          setIsLoading(false);
          router.push(`/detailPemilihan/${id}`);
        })
        .catch((error) => {
          setIsLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response?.data?.message,
          });
        });
    }
  }, [id]);

  const handleResendClick = async () => {
    try {
      await votingServices.resendVerifyVoteUsers(id);
      setResendDisabled(true);
      let timeLeft = 60;
      setRemainingTime(timeLeft);
      const countdownInterval = setInterval(() => {
        timeLeft -= 1;
        setRemainingTime(timeLeft);
        if (timeLeft === 0) {
          clearInterval(countdownInterval);
          setResendDisabled(false);
        }
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error resending OTP',
        text: error.response?.data?.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Verification Vote</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Navbar />
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formProfile}>
              <div className={styles.TitleCenter}>Verification Vote</div>
              <div className={styles.containerAlready}>
                {isLoading ? (
                  <div className={styles.teksAlready}>
                    Please wait, we are still verifying your vote.
                  </div>
                ) : (
                  <div className={styles.teksAlready}>
                    Your vote has been verified successfully.
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleResendClick}
                  disabled={resendDisabled}
                  className={styles.resendOtpButton}
                >
                  Resend OTP{' '}
                  {remainingTime > 0 ? `in ${remainingTime} seconds` : ''}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
