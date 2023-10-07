/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import BaseButton from 'components/atoms/Button/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Head from 'next/head';
import AuthService from 'services/auth-services';
import FormController from 'components/atoms/Form/formController';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import styles from '../styles/Home.module.css';

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
      router.push('/daftar');
    } else {
      try {
        const decodedToken = jwt.decode(authToken);

        if (!decodedToken) {
          router.push('/otpLoginRegister');
        } else {
          const { exp } = decodedToken;

          const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
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
    email: '',
    name: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email perlu diisi!'),
    name: Yup.string().required('Nama perlu diisi!'),
    password: Yup.string().required('Password perlu diisi!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password perlu diisi!'),
  });

  function encryptData(name, email, password) {
    const algorithm = 'aes-256-cbc';
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(key, 'hex'),
      iv
    );
    let encryptedData = cipher.update(
      JSON.stringify({ name, email, password }),
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
    const encryptedValues = encryptData(values);
    try {
      await AuthService.register(encryptedValues);
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
          <Stack gap={3}>
            <FormController
              control="input"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your Email"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your Name"
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
            <FormController
              control="input"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your Password"
              formikProps={formikProps}
            />
            <BaseButton variant="primary" type="submit" disabled={isLoading}>
              <div style={{ fontSize: '12px' }}>Sign Up</div>
            </BaseButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function Daftar() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PilihGeh-Daftar</title>
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
              <div className={styles.TitleCenter}>Sign Up</div>
              <div className={styles.containerForm}>
                <div style={{ width: '250px' }}>
                  <RegisterForm />
                </div>
              </div>
              <div className={styles.containerAlready}>
                <div className={styles.teksAlready}>
                  Already have an account?&nbsp;
                  <div className={styles.linkAlready}>
                    <Link href="/">Sign In</Link>
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
