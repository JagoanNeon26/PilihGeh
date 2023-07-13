/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import BaseButton from 'components/atoms/Button/button';
import FormController from 'components/atoms/Form/formController';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValue = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values) => {
    const { email, password } = values;
  };

  return (
    <Formik
      initialValues={initialValue}
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
            <BaseButton variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign In'}
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
          <Col className={styles.formLogin}>
            <div className={styles.logoLogin}>
              <Image src="/Logo.png" alt="logo-login" layout="fill" />
            </div>
            <div className={styles.TeksLogin}>Sign In</div>
            <div className={styles.teksDaftar}>
              Dont Have Account?&nbsp;
              <div className={styles.linkDaftar}>
                <Link href="/daftar">Create an Account</Link>
              </div>
            </div>
            <LoginForm />
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
