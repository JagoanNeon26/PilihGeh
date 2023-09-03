import React, { useState } from 'react';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import { Button, Row, Spinner } from 'react-bootstrap';
import BaseButton from 'components/atoms/Button/button';
import ModalEditVoting from 'components/molecules/Modal/modalEditVoting';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import votingServices from 'services/voting-services';
import styles from '../../../styles/Home.module.css';

function DetailPemilihan() {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleEmergencyStop = async () => {
    setIsLoading(true);
    try {
      await votingServices.setEmergency(id);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'The voting is now emergency stopping',
      });
    } catch (error) {
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
        text: 'The voting is now stopping',
      });
    } catch (error) {
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
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Add</div>
            </BaseButton>
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
              disabled={isLoading}
              className={styles.baseButton}
            >
              <div style={{ width: '60px' }}>
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm" />
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
