import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import ModalAddAdmin from 'components/molecules/Modal/modalAddAdmin';
import TableManageAdmin from 'components/atoms/Table/tableManageAdmin';
import styles from '../../../styles/Home.module.css';

function DetailPemilihan() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Manage Admin</div>
      </Row>
      <Row>
        <Col className={styles.tableAdminWrapper}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <Button className={styles.buttonAddVote}>
              <div style={{ width: '60px' }}>Send</div>
            </Button>
            <Button className={styles.buttonAddVote}>
              <div style={{ width: '60px' }}>Download</div>
            </Button>
            <Button onClick={handleShow} className={styles.buttonAddVote}>
              <div style={{ width: '60px' }}>Add</div>
            </Button>
          </div>
          <TableManageAdmin />
        </Col>
      </Row>
      <ModalAddAdmin show={modalShow} onHide={() => handleClose()} />
    </div>
  );
}

export default DetailPemilihan;
