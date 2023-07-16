/* eslint-disable no-unused-vars */
import { React } from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import styles from './modal.module.css';
import BaseButton from 'components/atoms/Button/button';

export default function ModalProfil(props) {
  return (
    <>
      <Modal
        {...props}
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
          }}
          closeButton
        >
          <div className={styles.headerEditProfile}>
            Edit Profil
            <div className={styles.headerEditDesc}>
              Isilah form dibawah ini untuk mengubah profil
            </div>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: '10px 30px 50px 30px',
            overflowY: 'auto',
          }}
        >
          <Accordion defaultActiveKey="0" className={styles.accordion}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Visi</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                Test
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Misi</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <BaseButton type="submit">
            <div style={{ width: '100px' }}>Vote</div>
          </BaseButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
