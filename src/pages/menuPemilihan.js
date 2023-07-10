import React, { useState } from 'react';
import Navbar from 'components/molecules/Navbar/navbar';
import { Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import DynamicTable from 'components/molecules/Table/DynamicTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ModalAddVoting from 'components/molecules/Modal/modal';
import styles from '../styles/Home.module.css';

function MenuPemilihan() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const headersVoting = ['VOTING NAME', 'DATE', 'VOTE STATUS', 'VOTING STATUS'];
  const headersAdmin = ['VOTING NAME', 'DATE', '', 'VOTING STATUS'];
  const serverDataVoting = [
    {
      name: 'John Doe',
      date: '30',
      voteStatus: 'YES',
      email: 'john@example.com',
    },
    {
      name: 'Jane Smith',
      date: '25',
      voteStatus: 'NO',
      email: 'jane@example.com',
    },
    {
      name: 'Jane Smith',
      date: '25',
      voteStatus: 'YES',
      email: 'jane@example.com',
    },
  ];
  const serverDataAdmin = [
    { name: 'John Doe', date: '55', email: 'john@example.com' },
    { name: 'Jane Smith', date: '35', email: 'jane@example.com' },
    { name: 'Jane Smith', date: '15', email: 'jane@example.com' },
  ];

  const dataVoting = serverDataVoting.map(
    ({ name, date, voteStatus, email }) => [
      name,
      date,
      voteStatus === 'YES' ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faTimes} />
      ),
      email,
    ]
  );
  const dataAdmin = serverDataAdmin.map(({ name, date, email }) => [
    name,
    date,
    '',
    email,
  ]);

  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <Navbar />
        <Row>
          <Col className={styles.judul}>
            <h1>My Voting</h1>
          </Col>
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
              <Button onClick={handleShow}>
                <div style={{ width: '60px' }}>Add</div>
              </Button>
            </div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Home">
                <DynamicTable headers={headersVoting} data={dataVoting} />
              </Tab>
              <Tab eventKey="profile" title="Profile">
                <DynamicTable headers={headersAdmin} data={dataAdmin} />
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
