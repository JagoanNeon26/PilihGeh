/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { Modal, Accordion, ModalFooter, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import styles from './modal.module.css';

export default function ModalVote(props) {
  const { show, onHide, visi, misi, noCandidate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleVoteClick = async () => {
    setIsLoading(true);
    try {
      await votingServices.checkVoteAvalaibility(id);
      setIsLoading(false);
      router.push(`${id}/verifPhotoVote/${noCandidate}`);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error resending OTP',
        text: error.response?.data?.message,
      });
      setIsLoading(false);
    }
  };

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
          onClick={handleVoteClick}
          disabled={isLoading}
        >
          {isLoading ? 'Voting...' : 'Vote!'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
