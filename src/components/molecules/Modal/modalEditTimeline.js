import { React, useEffect, useState } from 'react';
import { Modal, Spinner, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import FormController from '../../atoms/Form/formController';
import BaseButton from '../../atoms/Button/button';
import styles from './modal.module.css';

function FormEditTimeline({ initialValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const validationSchema = Yup.object({
    start_vote: Yup.string().required('Voting Day is required'),
    end_vote: Yup.string().required('Final Count Day is required'),
    show_count: Yup.string().required('Closing Day is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await votingServices.updateTimeline(id, values);
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
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
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="end_vote"
              type="datetime-local"
              label="Final Count Day"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="show_count"
              type="datetime-local"
              label="Closing Day"
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

export default function ModalEditTimeline(props) {
  const { show, onHide } = props;
  const router = useRouter();
  const { id } = router.query;

  const [setIsLoading] = useState(false);
  const [timelineItems, setTimelineItems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await votingServices.getTimeline(id);
        setTimelineItems(response.data.timeline);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching timeline data',
          text: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
          Edit Timeline
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
        {timelineItems !== null ? (
          <FormEditTimeline
            initialValues={{
              start_vote: timelineItems.start,
              end_vote: timelineItems.end,
              show_count: timelineItems.show,
            }}
          />
        ) : (
          <Spinner animation="border" variant="dark" />
        )}
      </Modal.Body>
    </Modal>
  );
}
