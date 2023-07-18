/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import BaseButton from 'components/atoms/Button/button';
import OTPInput from 'react-otp-input';
import styles from '../styles/Home.module.css';

function OtpForm() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the OTP value
    // eslint-disable-next-line no-console
    console.log(otp);

    // Reset the OTP input
    setOtp('');

    // Perform any other actions related to form submission
    // For example, you can make an API call or trigger loading state
    setIsLoading(true);

    // Simulating an asynchronous action with setTimeout
    setTimeout(() => {
      // Reset the loading state
      setIsLoading(false);
    }, 2000);
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
        <BaseButton
          variant="primary"
          type="submit"
          disabled={isLoading}
          to="/menuPemilihan"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
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
              <div className={styles.logoLoginRegisterOtp}>
                <Image src="/Logo.png" alt="logo-login" layout="fill" />
              </div>
              <div className={styles.TeksLoginDaftarOtp}>Verification Code</div>
              <div className={styles.containerAlready}>
                <div className={styles.teksAlready}>
                  We have sent the code verification to Your WhatsApp Number or
                  Email
                </div>
              </div>
              <div className={styles.containerLoginDaftarOTPForm}>
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
