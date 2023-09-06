/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import FormController from '../../atoms/Form/formController';
import BaseButton from '../../atoms/Button/button';
import styles from './modal.module.css';

function FormAddCandidate() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const initialValues = {
    candidateNumber: '',
    candidate1Name: '',
    candidate2Name: '',
    candidate1Tag: '',
    candidate2Tag: '',
    visi: '',
    misi: '',
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
    setIsLoading(true);
    try {
      const response = await votingServices.addCandidate(id, values);
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
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
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>
          Add Voting
          <div className={styles.headerRequired}>
            <div style={{ color: 'red' }}>*</div>
            Required
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormAddCandidate />
      </Modal.Body>
    </Modal>
  );
}
