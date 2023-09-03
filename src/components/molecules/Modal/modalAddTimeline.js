/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import FormController from '../../atoms/Form/formController';
import BaseButton from '../../atoms/Button/button';
import styles from './modal.module.css';

function FormAddTimeline() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const initialValues = {
    start_vote: '',
    end_vote: '',
    show_count: '',
    timezone: userTimezone,
  };

  const validationSchema = Yup.object({
    start_vote: Yup.date().required('Voting Day is required'),
    end_vote: Yup.date().required('Final Count Day is required'),
    show_count: Yup.date().required('Closing Day is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await votingServices.addTimeline(id, values);
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: error.response.data.message,
        });
      }
    }
  };

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
              name="start_vote"
              type="datetime-local"
              label="Voting Day"
              placeholder="12/12/2012"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="end_vote"
              type="datetime-local"
              label="End Vote Day"
              placeholder="12/12/2012"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="show_count"
              type="datetime-local"
              label="Show Count Day"
              placeholder="12/12/2012"
              formikProps={formikProps}
              required
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
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>
          Add Timeline
          <div className={styles.headerRequired}>
            <div style={{ color: 'red' }}>*</div>
            Required
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormAddTimeline />
      </Modal.Body>
    </Modal>
  );
}
