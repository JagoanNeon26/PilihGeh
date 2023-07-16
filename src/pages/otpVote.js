/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import BaseButton from 'components/atoms/Button/button';
import Link from 'next/link';
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
            width: '53px',
            height: '53px',
            backgroundColor: '#EDF1F4',
            border: '3px solid #CAD6E2',
            borderRadius: '6px',
          }}
          containerStyle={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        />
        <BaseButton variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </BaseButton>
      </Stack>
    </form>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Verification</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col className={styles.formOtp}>
            <div className={styles.logoLogin}>
              <Image src="/Logo.png" alt="logo-login" layout="fill" />
            </div>
            <div className={styles.TeksLogin}>Verification Code</div>
            <div className={styles.teksOtp}>
              We have sent the code verification to <br />
              <b>Your WhatsApp Number or Email</b>
            </div>
            <OtpForm />
          </Col>
          <Col className="d-none d-md-block p-0">
            <div className={styles.bgLogin}>
              <Image src="/Bg login.png" alt="banner-login" layout="fill" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
