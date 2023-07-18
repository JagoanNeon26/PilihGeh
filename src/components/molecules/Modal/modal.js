/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

function FormAddVoting() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    votingName: '',
    organizationName: '',
    description: '',
  };

  const validationSchema = Yup.object({
    // fullName: Yup.string().required('Harga Tawar diperlukan!'),
  });

  const onSubmit = (values) => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ formikProps }) => (
        <Form>
          <Stack gap={4}>
            <FormController
              control="input"
              name="votingName"
              type="input"
              label="Voting Name"
              placeholder="Enter your Voting Name"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="organizationName"
              type="input"
              label="Organization Name"
              placeholder="Enter your Organization Name"
              formikProps={formikProps}
            />
            <FormController
              control="textArea"
              name="description"
              type="input"
              label="Description"
              placeholder="Enter your Description"
              formikProps={formikProps}
            />
            <BaseButton variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Add'}
            </BaseButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function ModalAddVoting(props) {
  const { show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.modal}
      contentClassName={styles.modal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          borderBottom: '2px solid #C2C2C2',
          fontWeight: 'bold',
          fontSize: '18px',
          padding: '16px 30px 16px 30px',
          backgroundColor: '#0D1117',
          color: '#e6edf3',
        }}
        closeButton
      >
        <div className={styles.headerEditProfile}>
          Add Voting
          <div className={styles.headerEditDesc}>
            Fill Form Below to Add Voting
          </div>
        </div>
      </Modal.Header>
      <Modal.Body
        style={{
          padding: '10px 30px 30px 30px',
          overflowY: 'auto',
          backgroundColor: '#0D1117',
          color: '#e6edf3',
        }}
      >
        <FormAddVoting />
      </Modal.Body>
    </Modal>
  );
}
