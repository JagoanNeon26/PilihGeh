/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Head from 'next/head';
import AuthService from 'services/auth-services';
import FormController from 'components/atoms/Form/formController';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await AuthService.register(values);
      setIsLoading(false);
      router.push('/otpLoginRegister');
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
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
              label="Email/Phone Number"
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
            <Button variant="primary" type="submit" disabled={isLoading}>
              <div style={{ fontSize: '12px' }}>
                {isLoading ? 'Loading...' : 'Sign Up'}
              </div>
            </Button>
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
        <title>PilihGeh-Login</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formLoginDaftarOTP}>
              <div className={styles.logoLoginRegisterOtp}>
                <Image src="/Logo.png" alt="logo-login" layout="fill" />
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
