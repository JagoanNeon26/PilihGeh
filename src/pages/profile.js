/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import BaseButton from 'components/atoms/Button/button';
import FormController from 'components/atoms/Form/formController';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Navbar from 'components/molecules/Navbar/navbar';
import styles from '../styles/Home.module.css';

function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const choices = [
    { key: 'Choose', value: '' },
    { key: 'NPM/NIM', value: 0 },
    { key: 'NIS', value: 1 },
    { key: 'NIK', value: 2 },
  ];

  const initialValue = {
    email: '',
    name: '',
    phoneNumber: '',
    personalID: '',
    personalIDType: '',
    agency: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    personalIDType: Yup.string().required('Personal ID type is required'),
    personalID: Yup.string().required('Personal ID is required'),
    agency: Yup.string().test(
      'required-agency',
      'Agency is required',
      function handleFromAgency(value) {
        const personalIDType = this.resolve(Yup.ref('personalIDType'));
        if (personalIDType === '0' || personalIDType === '1') {
          return value !== undefined && value.trim() !== '';
        }
        return true;
      }
    ),
  });

  const onSubmit = (values) => {
    const { email, name, phoneNumber, personalID, personalIDType, agency } =
      values;
  };

  return (
    <Formik
      initialValues={initialValue}
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
              name="phoneNumber"
              type="number"
              label="Phone Number"
              placeholder="Enter your Phone Number"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="personalID"
              type="number"
              label="Personal ID"
              placeholder="Enter your Personal ID"
              formikProps={formikProps}
            />
            <FormController
              control="formSelect"
              name="personalIDType"
              type="input"
              label="Personal ID Type"
              options={choices}
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="agency"
              type="input"
              label="Agency"
              placeholder="Enter your Agency"
              disabled={!['0', '1'].includes(formikProps.values.personalIDType)}
              formikProps={formikProps}
            />
            <BaseButton variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
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
        <title>Profile</title>
        <link rel="icon" href="/Logo 3.png" />
      </Head>

      <Container fluid>
        <Row>
          <Navbar />
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.formLoginDaftarOTP}>
              <div className={styles.TeksLoginDaftarOtp}>Profile</div>
              <div className={styles.containerLoginDaftarOTPForm}>
                <div style={{ width: '250px' }}>
                  <ProfileForm />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
