import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import HorizontalTimeline from 'components/atoms/Timeline/HorizontalTimeline';

import ModalAddTimeline from 'components/molecules/Modal/modalAddTimeline';
import styles from '../../styles/Home.module.css';

function TimelineAdmin() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const timelineItems = [];

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Timeline</div>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}
      >
        {timelineItems.length === 0 ? (
          <div className={styles.timelineBox}>
            <div className={styles.containerNoValue}>
              <div>No timeline available</div>
              <div className={styles.buttonNoValueWrapper}>
                <Button onClick={handleShow} className={styles.buttonAddVote}>
                  <div style={{ width: '60px' }}>Add</div>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.timelineBox}>
            <HorizontalTimeline timelineItems={timelineItems} />
          </div>
        )}
      </Row>
      <ModalAddTimeline show={modalShow} onHide={() => handleClose()} />
    </div>
  );
}

export default TimelineAdmin;
