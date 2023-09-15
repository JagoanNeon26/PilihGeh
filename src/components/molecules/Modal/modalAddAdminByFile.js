/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal } from 'react-bootstrap';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

function FormAddAdminByFile() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      const response = await votingServices.addAdminByFile(id, formData);
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: error.response?.data?.message,
        });
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
    multiple: false,
  });

  return (
    <div>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag or Select File</p>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        <BaseButton
          type="button"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={onDrop}
        >
          Submit
        </BaseButton>
      </div>
    </div>
  );
}

export default function ModalAddAdminByFile(props) {
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
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>
          Add Admin
          <div className={styles.headerRequired}>
            <div style={{ color: 'red' }}>*</div>
            Required
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormAddAdminByFile />
      </Modal.Body>
    </Modal>
  );
}
