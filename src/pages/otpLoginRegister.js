import React, { useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AuthService from 'services/auth-services';
import Link from 'next/link';
import BaseButton from 'components/atoms/Button/button';
import OTPInput from 'react-otp-input';
import Swal from 'sweetalert2';
import styles from '../styles/Home.module.css';

function OtpForm() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        text: error.response.data.message,
      });
    }
    setIsLoading(false);
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
