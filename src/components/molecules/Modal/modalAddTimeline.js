/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

function FormAddTimeline() {
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
              name="votingDay"
              type="Date"
              label="Voting Day"
              placeholder="12/12/2012"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="finalCountDay"
              type="Date"
              label="Final Count Day"
              placeholder="12/12/2012"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="closingDay"
              type="Date"
              label="Closing Day"
              placeholder="12/12/2012"
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

export default function ModalAddTimeline(props) {
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
          Add Timeline
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
        <FormAddTimeline />
      </Modal.Body>
    </Modal>
  );
}
