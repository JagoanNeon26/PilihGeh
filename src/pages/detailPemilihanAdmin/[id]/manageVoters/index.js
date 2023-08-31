import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import TableManageVoters from 'components/atoms/Table/tableManageVoters';
import ModalAddVoters from 'components/molecules/Modal/modalAddVoters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faDownload,
  faPlus,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import votingServices from 'services/voting-services';
import ModalAddVotersByFile from 'components/molecules/Modal/modalAddVotersByFiles';
import styles from '../../../../styles/Home.module.css';

function ManageVoters() {
  const router = useRouter();
  const { id } = router.query;
  const [windowWidth, setWindowWidth] = useState(768);
  const [tableData, setTableData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalUploadShow, setModalUploadShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleUploadShow = () => setModalUploadShow(true);
  const handleClose = () => setModalShow(false);
  const handleUploadClose = () => setModalUploadShow(false);
  const setIsLoading = useState(false);

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

  const handleSendToken = async () => {
    setIsLoading(true);
    try {
      const response = await votingServices.sendTokenVoters(id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
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
              <Button onClick={handleSendToken} className={styles.baseButton}>
                <div>
                  <FontAwesomeIcon icon={faPaperPlane} />
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
              <Button onClick={handleSendToken} className={styles.baseButton}>
                <div style={{ width: '60px' }}>Send</div>
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
        <div className={styles.judulDetailPemilihan}>Manage Voters</div>
      </Row>
      <Row>
        <Col className={styles.tableAdminWrapper}>
          {renderButtons()}
          <TableManageVoters onDataReady={handleDataReady} />
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
