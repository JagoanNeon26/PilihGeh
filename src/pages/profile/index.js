/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Col, Container, Row, Spinner, Stack } from 'react-bootstrap';
import BaseButton from 'components/atoms/Button/button';
import FormController from 'components/atoms/Form/formController';
import { Form, Formik } from 'formik';
import UserService from 'services/user-services';
import * as Yup from 'yup';
import Navbar from 'components/molecules/Navbar/navbar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    UserService.getUser()
      .then((response) => {
        setUserData(response.data.profile);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching user data',
          text: error.response?.data?.message,
        });
      });
  }, []);

  if (!userData) {
    return (
      <div className={styles.loadingForm}>
        <Spinner animation="border" role="status" size="md" variant="light" />
      </div>
    );
  }

  const choices = [
    { key: 'Choose', value: '' },
    { key: 'NPM/NIM', value: 'NPM/NIM' },
    { key: 'NIS', value: 'NIS' },
    { key: 'NIK', value: 'NIK' },
  ];

  const initialValue = {
    email: userData.email || '',
    name: userData.name || '',
    no_hp: userData.no_hp || '',
    personal_data: userData.personal_data || '',
    personal_data_type: userData.personal_data_type || '',
    agency: userData.agency || '',
  };

  const validationSchema = Yup.object({
    personal_data: Yup.string().test(
      'required-personal-data',
      'Personal ID is required',
      function handleFromPersonalData(value) {
        const personal_data_type = this.resolve(Yup.ref('personal_data_type'));
        return (
          !['NPM/NIM', 'NIS', 'NIK'].includes(personal_data_type) ||
          (value && value.trim() !== '')
        );
      }
    ),
    agency: Yup.string().test(
      'required-agency',
      'Agency is required',
      function handleFromAgency(value) {
        const personal_data_type = this.resolve(Yup.ref('personal_data_type'));
        return (
          !['NPM/NIM', 'NIS'].includes(personal_data_type) ||
          (value && value.trim() !== '')
        );
      }
    ),
  });

  const onSubmit = async (values) => {
    const { email, no_hp } = values;
    setIsLoading(true);

    const updatedEmail = email !== userData.email && userData.email !== '';
    const updatedPhone = no_hp !== userData.no_hp && userData.no_hp !== '';

    let formattedNoHp = no_hp;

    if (no_hp && /^[0-9]/.test(no_hp)) {
      // If the first character is a digit, format as needed
      if (no_hp.startsWith('0')) {
        formattedNoHp = `62${no_hp.slice(1)}`;
      } else if (!no_hp.startsWith('62')) {
        formattedNoHp = `62${no_hp}`;
      }
    }

    try {
      await UserService.editProfile({ ...values, no_hp: formattedNoHp });
      setIsLoading(false);

      if (
        (updatedEmail || updatedPhone) &&
        (email !== userData.email || no_hp !== userData.no_hp)
      ) {
        router.push('/profile/verifProfile');
      } else {
        await UserService.getUser(); // Fetch updated user data
        Swal.fire({
          title: 'Success',
          text: 'Data berhasil diubah!',
          icon: 'success',
        });
      }
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
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <Stack gap={3}>
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
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your Email"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="no_hp"
              type="input"
              label="Phone Number"
              placeholder="Enter your Phone Number"
              formikProps={formikProps}
            />
            <FormController
              control="formSelect"
              name="personal_data_type"
              type="input"
              label="Personal ID Type"
              options={choices}
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="personal_data"
              type="input"
              label="Personal ID"
              placeholder="Enter your Personal ID"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="agency"
              type="input"
              label="Agency"
              placeholder="Enter your Agency"
              disabled={
                !['NPM/NIM', 'NIS'].includes(
                  formikProps.values.personal_data_type
                )
              }
              formikProps={formikProps}
            />
            <BaseButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Submit
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
            <div className={styles.formProfile}>
              <div className={styles.TitleCenter}>Profile</div>
              <div className={styles.containerFormProfile}>
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
