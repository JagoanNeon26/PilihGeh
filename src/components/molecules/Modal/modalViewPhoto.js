import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './modal.module.css';

export default function ModalViewPhoto(props) {
  const { show, onHide, selectedPhoto } = props;

  return (
    <Modal show={show} onHide={onHide} centered className={styles.modal}>
      <Modal.Body className={styles.modalBodyViewPhoto}>
        <img src={selectedPhoto} />
      </Modal.Body>
    </Modal>
  );
}
