import React, { useState } from 'react';
import Navbar from 'components/molecules/Navbar/navbar';
import { Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import TableVote from 'components/atoms/Table/table';
import ModalAddVoting from 'components/molecules/Modal/modal';
import TableAdmin from 'components/atoms/Table/tableAdmin';
import styles from '../styles/Home.module.css';

function MenuPemilihan() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <Navbar />
        <Row>
          <Col className={styles.judul}>My Voting</Col>
        </Row>
        <Row>
          <Col className={styles.tabs}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '-30px',
              }}
            >
              <Button onClick={handleShow} className={styles.buttonAddVote}>
                <div className={styles.widthButtonAddVote}>Add</div>
              </Button>
            </div>
            <Tabs
              defaultActiveKey="voters"
              id="uncontrolled-tab-example"
              className={styles.tab}
            >
              <Tab eventKey="voters" title="Voters">
                <TableVote />
              </Tab>
              <Tab eventKey="admin" title="Admin">
                <TableAdmin />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>

      <ModalAddVoting show={modalShow} onHide={() => handleClose()} />
    </>
  );
}

export default MenuPemilihan;
