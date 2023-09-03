import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import BaseButton from '../../atoms/Button/button';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';

function FormEditVoting() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [dataVoting, setDataVoting] = useState(null);

  useEffect(() => {
    votingServices
      .getAdminVotingById(id)
      .then((response) => {
        setDataVoting(response.data.getPemilihan);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching user data',
          text: error,
        });
      });
  }, []);

  if (!dataVoting) {
    return (
      <div className={styles.loadingForm}>
        <Spinner animation="border" role="status" size="md" variant="light" />
      </div>
    );
  }

  const initialValues = {
    title: dataVoting?.title || '',
    organization: dataVoting?.organization || '',
    detail: dataVoting?.detail || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    organization: Yup.string().required('Organization is required'),
    detail: Yup.string().required('Description is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await votingServices.editVoting(id, values);
      setIsLoading(false);
      router.reload();
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
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

function ModalEditVoting(props) {
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
          Edit Detail Voting
          <div className={styles.headerEditDesc}>
            Fill Form Below to Edit Detail Voting
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormEditVoting />
      </Modal.Body>
    </Modal>
  );
}

export default ModalEditVoting;
