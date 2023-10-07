import React, { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import BaseButton from '../../atoms/Button/button';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';

function FormAddVoting() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    title: '',
    organization: '',
    detail: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Voting Name perlu diisi!'),
    organization: Yup.string().required('Organization perlu diisi!'),
    detail: Yup.string().required('Description perlu diisi!'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await votingServices.addVoting(values);
      setIsLoading(false);
      router.reload();
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ formikProps }) => (
        <Form>
          <Stack gap={4}>
            <FormController
              control="input"
              name="title"
              type="input"
              label="Voting Name"
              placeholder="Enter your Voting Name"
              formikProps={formikProps}
            />
            <FormController
              control="input"
              name="organization"
              type="input"
              label="Organization Name"
              placeholder="Enter your Organization Name"
              formikProps={formikProps}
            />
            <FormController
              control="textArea"
              name="detail"
              type="input"
              label="Description"
              placeholder="Enter your Description"
              formikProps={formikProps}
            />
            <BaseButton
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Add
            </BaseButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

function ModalAddVoting(props) {
  const { show, onHide } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.headerEditProfile}>
          Add Voting
          <div className={styles.headerEditDesc}>
            Fill Form Below to Add Voting
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormAddVoting />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddVoting;
