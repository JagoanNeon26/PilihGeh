/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React, useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormController from '../../atoms/Form/formController';
import styles from './modal.module.css';
import BaseButton from '../../atoms/Button/button';

export default function ModalDeleteEmail(props) {
  const { show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.modalDelete}
      contentClassName={styles.modalDelete}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        style={{
          padding: '30px 30px 30px 30px',
          overflowY: 'auto',
          backgroundColor: '#0D1117',
          color: '#e6edf3',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          Are you sure want to delete
          <div className={styles.emailDelete}>johndoe@gmail.com</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <BaseButton type="submit">
            <div style={{ width: '60px' }}>No</div>
          </BaseButton>
          <BaseButton type="submit">
            <div style={{ width: '60px' }}>Yes</div>
          </BaseButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}
