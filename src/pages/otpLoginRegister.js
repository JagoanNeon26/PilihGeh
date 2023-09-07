import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AuthService from 'services/auth-services';
import Link from 'next/link';
import BaseButton from 'components/atoms/Button/button';
import OTPInput from 'react-otp-input';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import styles from '../styles/Home.module.css';

function OtpForm() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
      router.push('/');
    } else {
      try {
        const decodedToken = jwt.decode(authToken);

        if (!decodedToken) {
          router.push('/otpLoginRegister');
        } else {
          // Get the expiration time (exp) from the decoded token
          const { exp } = decodedToken;

          // Check if the token has expired
          const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
          if (exp && exp < currentTime) {
            // Token has expired, redirect to /index or any other page
            router.push('/');
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error verifying OTP',
          text: error,
        });
        // Handle the error appropriately (e.g., log it or redirect to an error page)
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.verifyOtp({ otp });
      setOtp('');
      router.push('/menuPemilihan');
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error verifying OTP',
        text: error.response?.data?.message,
      });
    }
    setIsLoading(false);
  };

  const handleResendClick = async () => {
    try {
      await AuthService.resendOtp();
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
    <form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>&nbsp;</span>}
          renderInput={(props) => <input {...props} />}
          shouldAutoFocus
          inputStyle={{
            width: '40px',
            height: '40px',
            backgroundColor: '#0D1117',
            border: '1px solid #30363D',
            borderRadius: '6px',
            color: '#edf1f4',
            fontSize: '16px',
          }}
          containerStyle={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        />
        <BaseButton type="submit" isLoading={isLoading} disabled={isLoading}>
          Submit
        </BaseButton>
        <button
          type="button"
          onClick={handleResendClick}
          disabled={resendDisabled}
          className={styles.resendOtpButton}
        >
          Resend OTP {remainingTime > 0 ? `in ${remainingTime} seconds` : ''}
        </button>
      </Stack>
    </form>
  );
}

export default function OtpVerif() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Verification OTP</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formLoginDaftarOTP}>
              <Link href="/">
                <div className={styles.logoLoginRegisterOtp}>
                  <Image src="/Logo.png" alt="logo-login" layout="fill" />
                </div>
              </Link>
              <div className={styles.TitleCenter}>Verification Code</div>
              <div className={styles.containerAlready}>
                <div className={styles.teksAlready}>
                  We have sent the code verification to Your WhatsApp Number or
                  Email
                </div>
              </div>
              <div className={styles.containerForm}>
                <div style={{ width: '250px' }}>
                  <OtpForm />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
