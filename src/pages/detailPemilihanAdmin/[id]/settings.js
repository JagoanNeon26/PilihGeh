import React, { useEffect, useState } from 'react';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import { Button, Row, Spinner } from 'react-bootstrap';
import ModalEditVoting from 'components/molecules/Modal/modalEditVoting';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import votingServices from 'services/voting-services';
import styles from '../../../styles/Home.module.css';

function DetailPemilihan() {
  const [votingStatus, setVotingStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadVote, setDownloadVote] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [stopIsLoading, setStopIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await votingServices.getAdminVotingById(id);
          const fetchedData = response.data.getPemilihan;
          setVotingStatus(fetchedData?.status);
        }
      } catch (error) {
        // Handle errors here
      }
    };
    fetchData();
  }, [id]);

  const handleDownload = async () => {
    setDownloadVote(true);
    try {
      const response = await votingServices.downloadVote(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Detail Pemilihan.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message,
      });
    } finally {
      setDownloadVote(false);
    }
  };

  const handleEmergencyStop = async () => {
    setIsLoading(true);
    try {
      await votingServices.setEmergency(id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text:
          votingStatus === 'Active'
            ? 'The voting is emergency stopping'
            : votingStatus === 'Emergency Stop Vote'
            ? 'The voting is activated'
            : 'Loading..',
      });
      router.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetVote = async () => {
    setResetLoading(true);
    try {
      await votingServices.resetVote(id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'The voting is done resetting',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message,
      });
      setResetLoading(false);
    } finally {
      setResetLoading(false);
    }
  };

  const handleStopVote = async () => {
    setStopIsLoading(true);
    try {
      await votingServices.setStop(id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text:
          votingStatus === 'Active'
            ? 'The voting is closing'
            : votingStatus === 'Tidak Bisa Diakses'
            ? 'The voting is opened'
            : 'Loading..',
      });
      router.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message,
      });
      setStopIsLoading(false);
    } finally {
      setStopIsLoading(false);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <Row className={styles.settingTitle}>
        <div className={styles.judulDetailPemilihan}>Settings</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexDirection: 'column',
          marginBottom: '40px',
        }}
      >
        {/* Download */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Download Report</div>
          <div className={styles.descContainerSettings}>
            Download this vote report.
          </div>
          <div>
            <Button
              className={styles.baseButton}
              type="button"
              onClick={handleDownload}
              disabled={downloadVote}
            >
              <div style={{ width: '60px' }}>
                {downloadVote ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  'Download'
                )}
              </div>
            </Button>
          </div>
        </div>
        {/* Change Name */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>
            Change Detail Voting
          </div>
          <div className={styles.descContainerSettings}>
            Click this button to change name, organization, and/or detail of
            this voting
          </div>
          <div>
            <Button
              className={styles.baseButton}
              type="button"
              onClick={handleShowModal}
            >
              <div style={{ width: '60px' }}>Change</div>
            </Button>
          </div>
        </div>
        {/* Emergency Stop */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>
            Emergency Stop Voting
          </div>
          <div className={styles.descContainerSettings}>
            Click this button to emergency stop this voting
          </div>
          <div>
            <Button
              type="button"
              onClick={handleEmergencyStop}
              disabled={
                votingStatus === 'Uncompleted Data' ||
                votingStatus === 'Tidak Bisa Diakses' ||
                isLoading
              }
              className={styles.baseButton}
            >
              <div style={{ width: '60px' }}>
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : votingStatus === 'Active' ? (
                  'Stop'
                ) : votingStatus === 'Emergency Stop Vote' ? (
                  'Activate'
                ) : (
                  'Stop'
                )}
              </div>
            </Button>
          </div>
        </div>
        {/* Reset Vote */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Reset Vote</div>
          <div className={styles.descContainerSettings}>
            Click this button to reset this voting
          </div>
          <div>
            <Button
              type="button"
              onClick={handleResetVote}
              disabled={resetLoading}
              className={styles.baseButton}
            >
              <div style={{ width: '60px' }}>
                {resetLoading ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : (
                  'Reset'
                )}
              </div>
            </Button>
          </div>
        </div>
        {/* Close Vote */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Close Vote</div>
          <div className={styles.descContainerSettings}>
            Click this button to close this voting
          </div>
          <div>
            <Button
              type="button"
              onClick={handleStopVote}
              disabled={stopIsLoading}
              className={styles.baseButton}
            >
              <div style={{ width: '60px' }}>
                {stopIsLoading ? (
                  <Spinner animation="border" role="status" size="sm" />
                ) : votingStatus === 'Active' ? (
                  'Close'
                ) : votingStatus === 'Tidak Bisa Diakses' ? (
                  'Activate'
                ) : (
                  'Close'
                )}
              </div>
            </Button>
          </div>
        </div>
      </Row>
      <ModalEditVoting show={isModalVisible} onHide={handleCloseModal} />
    </div>
  );
}

export default DetailPemilihan;
