/* eslint-disable no-unused-vars */
import { React } from 'react';
import { Modal, Accordion, ModalFooter, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import styles from './modal.module.css';

export default function ModalVote(props) {
  const { show, onHide, visi, misi, noCandidate } = props;
  const router = useRouter();
  const { id } = router.query;

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
      <Modal.Header className={styles.modalHeader} closeButton>
        <div className={styles.headerEditProfile}>
          Add Vote
          <div className={styles.headerEditDesc}>
            Click the vote button to add vote
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBodyVote}>
        <Accordion className={styles.accordion}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Visi</Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              {visi}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Misi</Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              {misi}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <ModalFooter className={styles.modalFooter}>
        <Button
          type="button"
          className={styles.baseButton}
          onClick={() => {
            router.push(`${id}/verifPhotoVote/${noCandidate}`);
          }}
        >
          Vote!
        </Button>
      </ModalFooter>
    </Modal>
  );
}
