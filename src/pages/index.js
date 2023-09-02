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
import styles from '../styles/Home.module.css';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
      router.push('/');
    } else {
      router.push('/menuPemilihan');
    }
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await AuthService.login(values);
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
          <Stack gap={4}>
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
                <Image src="/Logo.png" alt="logo-login" layout="fill" />
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
