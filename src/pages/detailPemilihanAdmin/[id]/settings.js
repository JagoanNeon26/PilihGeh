import React from 'react';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import { Row } from 'react-bootstrap';
import BaseButton from 'components/atoms/Button/button';
import styles from '../../../styles/Home.module.css';

function DetailPemilihan() {
  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Settings</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexDirection: 'column',
          marginBottom: '30px',
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
          <div className={styles.judulContainerSettings}>Change Name</div>
          <div className={styles.descContainerSettings}>
            Click this button to change name this voting
          </div>
          <div>
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Change</div>
            </BaseButton>
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
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Stop</div>
            </BaseButton>
          </div>
        </div>
        {/* Reset Vote */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Reset Vote</div>
          <div className={styles.descContainerSettings}>
            Click this button to reset this voting
          </div>
          <div>
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Reset</div>
            </BaseButton>
          </div>
        </div>
        {/* Close Vote */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Close Vote</div>
          <div className={styles.descContainerSettings}>
            Click this button to close this voting
          </div>
          <div>
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Close</div>
            </BaseButton>
          </div>
        </div>
        {/* Delete Vote */}
        <div className={styles.containerSettings}>
          <div className={styles.judulContainerSettings}>Delete Vote</div>
          <div className={styles.descContainerSettings}>
            Click this button to delete this voting
          </div>
          <div>
            <BaseButton type="submit">
              <div style={{ width: '60px' }}>Delete</div>
            </BaseButton>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default DetailPemilihan;
