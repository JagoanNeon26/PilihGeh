import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import FormController from 'components/atoms/Form/formController';
import { Form, Formik } from 'formik';
import AuthService from 'services/auth-services';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BaseButton from 'components/atoms/Button/button';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import styles from '../styles/Home.module.css';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
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
          const { exp } = decodedToken;

          const currentTime = Math.floor(Date.now() / 1000);
          if (exp && exp < currentTime) {
            localStorage.removeItem('auth-token');
            router.push('/');
          } else if (!decodedToken.verified) {
            router.push('/otpLoginRegister');
          } else {
            router.push('/menuPemilihan');
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error verifying OTP',
          text: error.response?.data?.message,
        });
        // Handle the error appropriately (e.g., log it or redirect to an error page)
      }
    }
  }, []);

  const initialValues = {
    loginInput: '',
    password: '',
  };

  const validationSchema = Yup.object({
    loginInput: Yup.string().required('Email/Phone Number is required'),
    password: Yup.string().required('Password is required'),
  });

  function encryptData(loginInput, password) {
    const algorithm = 'aes-256-cbc';
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(key, 'hex'),
      iv
    );
    let encryptedData = cipher.update(
      JSON.stringify({ loginInput, password }),
      'utf-8',
      'hex'
    );
    encryptedData += cipher.final('hex');

    return {
      iv: iv.toString('hex'),
      data: encryptedData,
    };
  }

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { loginInput, password } = values;

    let formattedLoginInput = loginInput;

    if (loginInput && /^[0-9]/.test(loginInput)) {
      if (loginInput.startsWith('0')) {
        formattedLoginInput = `62${loginInput.slice(1)}`;
      } else if (!loginInput.startsWith('62')) {
        formattedLoginInput = `62${loginInput}`;
      }
    }

    const encryptedValues = encryptData(formattedLoginInput, password);

    try {
      await AuthService.login(encryptedValues);
      setIsLoading(false);
      router.push('/otpLoginRegister');
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <Stack gap={4}>
            <FormController
              control="input"
              name="loginInput"
              type="input"
              label="Email/Phone Number"
              placeholder="Enter your Email/Phone Number"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your Password"
              formikProps={formikProps}
            />
            <BaseButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Sign In
            </BaseButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Login</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formLoginDaftarOTP}>
              <div className={styles.logoLoginRegisterOtp}>
                <Image
                  src="/Logo.png"
                  alt="logo-login"
                  layout="fill"
                  priority
                />
              </div>
              <div className={styles.TitleCenter}>Sign In</div>
              <div className={styles.containerForm}>
                <div style={{ width: '250px' }}>
                  <LoginForm />
                </div>
              </div>
              <div className={styles.containerAlready}>
                <div className={styles.teksAlready}>
                  Dont Have Account?&nbsp;
                  <div className={styles.linkAlready}>
                    <Link href="/daftar">Create an Account</Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
