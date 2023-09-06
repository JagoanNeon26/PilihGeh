/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import FormController from '../../atoms/Form/formController';
import BaseButton from '../../atoms/Button/button';
import styles from './modal.module.css';

function FormEditCandidate({ noCandidate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoadingButton, setSubmitLoadingButton] = useState(false);
  const [deleteLoadingButton, setDeleteLoadingButton] = useState(false);
  const [candidateData, setCandidateData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setIsLoading(true);
    votingServices
      .getCandidateById(id, noCandidate.candidateNumber)
      .then((response) => {
        setCandidateData(response.data.getKandidat);
        setIsLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error fetching candidate data',
          text: error.response?.data?.message,
        });
        setIsLoading(false);
      });
  }, [noCandidate, id]);

  if (isLoading) {
    return (
      <div className={styles.loadingForm}>
        <Spinner animation="border" role="status" size="md" variant="light" />
      </div>
    );
  }

  const initialValues = {
    candidateNumber: candidateData.candidateNumber || '',
    candidate1Name: candidateData.candidate1Name || '',
    candidate2Name: candidateData.candidate2Name || '',
    candidate1Tag: candidateData.candidate1Tag || '',
    candidate2Tag: candidateData.candidate2Tag || '',
    visi: candidateData.visi || '',
    misi: candidateData.misi || '',
  };

  const validationSchema = Yup.object({
    candidateNumber: Yup.number().required('Candidate Number is required!'),
    candidate1Name: Yup.string().required('Candidate 1 Name is required!'),
    candidate2Name: Yup.string(),
    candidate1Tag: Yup.string().required('Candidate 1 Tag is required!'),
    candidate2Tag: Yup.string(),
    visi: Yup.string().required('Vision is required!'),
    misi: Yup.string().required('Mision is required!'),
  });

  const onSubmit = async (values) => {
    setSubmitLoadingButton(true);
    try {
      const response = await votingServices.updateCandidate(
        id,
        noCandidate.candidateNumber,
        values
      );
      setSubmitLoadingButton(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      setSubmitLoadingButton(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message,
      });
    }
  };

  const handleDelete = async () => {
    setDeleteLoadingButton(true);
    try {
      await votingServices.deleteCandidateById(id, noCandidate.candidateNumber);
      setDeleteLoadingButton(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Candidate deleted successfully.',
      });
      router.reload();
    } catch (error) {
      setDeleteLoadingButton(false);
      router.reload();
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
              placeholder="Ketua"
              formikProps={formikProps}
              required
            />
            <FormController
              control="input"
              name="candidate2Tag"
              type="input"
              label="Candidate 2 Tag"
              placeholder="Wakil Ketua"
              formikProps={formikProps}
            />
            <FormController
              control="textArea"
              name="visi"
              type="input"
              label="Vision"
              placeholder="Enter your Vision"
              formikProps={formikProps}
              required
            />
            <FormController
              control="textArea"
              name="misi"
              type="input"
              label="Mision"
              placeholder="Enter your Mision"
              formikProps={formikProps}
              required
            />
            <div className={styles.buttonModalEdit}>
              <Button
                type="button"
                className={styles.buttonDelete}
                disabled={deleteLoadingButton}
                onClick={handleDelete}
              >
                <div style={{ width: '50px' }}>
                  {deleteLoadingButton ? 'Deleting...' : 'Delete'}
                </div>
              </Button>
              <BaseButton
                type="submit"
                isLoading={submitLoadingButton}
                disabled={submitLoadingButton}
              >
                <div style={{ width: '50px' }}>Submit</div>
              </BaseButton>
            </div>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default function ModalEditCandidate(props) {
  const { show, onHide, candidateNumber } = props;
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
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>
          Edit Voting
          <div className={styles.headerRequired}>
            <div style={{ color: 'red' }}>*</div>
            Required
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormEditCandidate noCandidate={{ candidateNumber }} />
      </Modal.Body>
    </Modal>
  );
}
