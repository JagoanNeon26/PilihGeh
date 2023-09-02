/* eslint-disable no-unused-vars */
/* eslint-enable no-console */
import { React } from 'react';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import styles from './modal.module.css';

export default function ModalDeleteEmailAdmin(props) {
  const { show, onHide, selectedId, selectedEmail } = props;
  const router = useRouter();
  const user_id = selectedId;
  const { id } = router.query;

  const handleDelete = async () => {
    try {
      const response = await votingServices.deleteAdmin(id, user_id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.response.data.message,
      });
    }
  };

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
          <div className={styles.emailDelete}>{selectedEmail}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button onClick={onHide} className={styles.baseButton}>
            <div style={{ width: '60px' }}>No</div>
          </Button>
          <Button onClick={handleDelete} className={styles.baseButton}>
            <div style={{ width: '60px' }}>Yes</div>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
