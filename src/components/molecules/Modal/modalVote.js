/* eslint-disable no-unused-vars */
import { React } from 'react';
import { Modal, Accordion, ModalFooter } from 'react-bootstrap';
import BaseButton from 'components/atoms/Button/button';
import styles from './modal.module.css';

export default function ModalVote(props) {
  const { show, onHide } = props;
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
          Add Voting
          <div className={styles.headerEditDesc}>
            Fill Form Below to Add Voting
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
        <Accordion defaultActiveKey="0" className={styles.accordion}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={styles.accordionHeader}>
              Visi
            </Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              Test
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className={styles.accordionHeader}>
              Misi
            </Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <ModalFooter style={{ backgroundColor: '#0D1117', color: '#e6edf3' }}>
        <BaseButton type="submit">
          <div style={{ width: '100px' }}>Vote</div>
        </BaseButton>
      </ModalFooter>
    </Modal>
  );
}
