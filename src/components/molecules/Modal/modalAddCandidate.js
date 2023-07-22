/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

function FormAddCandidate() {
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
              name="candidateNumber"
              type="number"
              label="Candidate Number"
              placeholder="1"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="candidate1Name"
              type="input"
              label="Candidate 1 Name"
              placeholder="Joko Santoso"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="candidate2Name"
              type="input"
              label="Candidate 2 Name"
              placeholder="Joko Santoso"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="candidate1Tag"
              type="input"
              label="Candidate 1 Tag"
              placeholder="Joko Santoso"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="candidate2Tag"
              type="input"
              label="Candidate 2 Tag"
              placeholder="Joko Santoso"
              formikProps={formikProps}
            />
            <FormController
              control="textArea"
              name="vision"
              type="input"
              label="Vision"
              placeholder="Enter your Vision"
              formikProps={formikProps}
              required
            />
            <FormController
              control="textArea"
              name="mision"
              type="input"
              label="Mision"
              placeholder="Enter your Mision"
              formikProps={formikProps}
              required
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

export default function ModalAddCandidate(props) {
  const { show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.modalAddCandidate}
      contentClassName={styles.modalAddCandidate}
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
          <div className={styles.headerRequired}>
            <div style={{ color: 'red' }}>*</div>
            Required
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
        <FormAddCandidate />
      </Modal.Body>
    </Modal>
  );
}
