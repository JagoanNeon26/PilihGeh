import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Tab, Tabs } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import ModalAddVoters from 'components/molecules/Modal/modalAddVoters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ModalAddVotersByFile from 'components/molecules/Modal/modalAddVotersByFiles';
import TableManageVote from 'components/atoms/Table/tableManageVote';
import TablePendingVote from 'components/atoms/Table/tablePendingVote';
import TableRejectVote from 'components/atoms/Table/tableRejectedVote';
import TableAcceptVote from 'components/atoms/Table/tableAcceptVote';
import styles from '../../../styles/Home.module.css';

function ManageVoters() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [tableData, setTableData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalUploadShow, setModalUploadShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleUploadClose = () => setModalUploadShow(false);

  const handleDataReady = (data) => {
    setTableData(data);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleDownload = () => {
    const csvContent = [
      Object.keys(tableData[0]).join(','),
      ...tableData.map((item) => Object.values(item).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'voter_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderButtons = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '20px',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {windowWidth <= 768 ? (
        <Button className={styles.baseButton} onClick={handleDownload}>
          <div>
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </Button>
      ) : (
        <Button className={styles.baseButton} onClick={handleDownload}>
          <div style={{ width: '60px' }}>Download</div>
        </Button>
      )}
    </div>
  );

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Manage Vote</div>
      </Row>
      <Row>
        <Col className={styles.tableAdminWrapper}>
          {renderButtons()}
          <Tabs
            defaultActiveKey="vote"
            id="uncontrolled-tab-example"
            className={styles.tab}
          >
            <Tab eventKey="vote" title="All Vote">
              <TableManageVote onDataReady={handleDataReady} />
            </Tab>
            <Tab eventKey="pendingVote" title="Pending Vote">
              <TablePendingVote onDataReady={handleDataReady} />
            </Tab>
            <Tab eventKey="acceptVote" title="Accept Vote">
              <TableAcceptVote onDataReady={handleDataReady} />
            </Tab>
            <Tab eventKey="rejectVote" title="Reject Vote">
              <TableRejectVote onDataReady={handleDataReady} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <ModalAddVoters show={modalShow} onHide={() => handleClose()} />
      <ModalAddVotersByFile
        show={modalUploadShow}
        onHide={() => handleUploadClose()}
      />
    </div>
  );
}

export default ManageVoters;
