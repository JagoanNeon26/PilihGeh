import { React, useState } from 'react';
import { Modal } from 'react-bootstrap';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

function FormAddCandidatePhoto({ noCandidate }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const onDrop = async (acceptedFiles) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      const response = await votingServices.addCandidatePhoto(
        id,
        formData,
        noCandidate
      );
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
          text: error,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred',
          text: error,
        });
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.jpg,.png',
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

export default function ModalAddCandidatePhoto(props) {
  const { show, onHide, candidateNumber } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modal}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      backdropClassName={styles.backdropModal}
      centered
    >
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>Add/Edit Photo</div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <FormAddCandidatePhoto noCandidate={candidateNumber} />
      </Modal.Body>
    </Modal>
  );
}
