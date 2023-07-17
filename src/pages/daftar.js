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

  const onSubmit = (values) => {
    const { email, name, password, repeatPassword } = values;
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
            <BaseButton variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign Up'}
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
        <title>PilihGeh-Sign Up</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row className={styles.bgLoginDaftar}>
          <Col className={styles.formDaftar}>
            <div className={styles.logoLogin}>
              <Image src="/Logo.png" alt="logo-login" layout="fill" />
            </div>
            <div className={styles.TeksLogin}>Sign Up</div>
            <div className={styles.teksDaftar}>
              Already Have Account?&nbsp;
              <div className={styles.linkDaftar}>
                <Link href="/#">Sign In</Link>
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
