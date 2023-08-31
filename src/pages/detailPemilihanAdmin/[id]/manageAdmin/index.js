import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import ModalAddAdmin from 'components/molecules/Modal/modalAddAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import ModalAddAdminByFile from 'components/molecules/Modal/modalAddAdminByFile';
import TableManageAdmin from 'components/atoms/Table/tableManageAdmin';
import styles from '../../../../styles/Home.module.css';

function ManageVoters() {
  const [windowWidth, setWindowWidth] = useState(768);
  const [tableData, setTableData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalUploadShow, setModalUploadShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleUploadShow = () => setModalUploadShow(true);
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

  const renderButtons = () => {
    if (tableData.length > 0) {
      return (
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
            <>
              <Button onClick={handleShow} className={styles.baseButton}>
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </Button>
              <Button className={styles.baseButton} onClick={handleDownload}>
                <div>
                  <FontAwesomeIcon icon={faDownload} />
                </div>
              </Button>
              <Button onClick={handleUploadShow} className={styles.baseButton}>
                <div>
                  <FontAwesomeIcon icon={faUpload} />
                </div>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleShow} className={styles.baseButton}>
                <div style={{ width: '60px' }}>Add</div>
              </Button>
              <Button className={styles.baseButton} onClick={handleDownload}>
                <div style={{ width: '60px' }}>Download</div>
              </Button>
              <Button onClick={handleUploadShow} className={styles.baseButton}>
                <div style={{ width: '60px' }}>Upload</div>
              </Button>
            </>
          )}
        </div>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {windowWidth <= 768 ? (
          <>
            <Button onClick={handleUploadShow} className={styles.baseButton}>
              <div>
                <FontAwesomeIcon icon={faUpload} />
              </div>
            </Button>
            <Button onClick={handleShow} className={styles.baseButton}>
              <div>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleUploadShow} className={styles.baseButton}>
              <div style={{ width: '60px' }}>Upload</div>
            </Button>
            <Button onClick={handleShow} className={styles.baseButton}>
              <div style={{ width: '60px' }}>Add</div>
            </Button>
          </>
        )}
      </div>
    );
  };

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
            {renderButtons()}
          </div>
          <TableManageAdmin onDataReady={handleDataReady} />
        </Col>
      </Row>
      <ModalAddAdmin show={modalShow} onHide={() => handleClose()} />
      <ModalAddAdminByFile
        show={modalUploadShow}
        onHide={() => handleUploadClose()}
      />
    </div>
  );
}

export default ManageVoters;
