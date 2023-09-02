import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import HorizontalTimeline from 'components/atoms/Timeline/HorizontalTimeline';
import ModalAddTimeline from 'components/molecules/Modal/modalAddTimeline';
import ModalEditTimeline from 'components/molecules/Modal/modalEditTimeline'; // Import the edit modal
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import styles from '../../../styles/Home.module.css';

function TimelineAdmin() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const [editModalShow, setEditModalShow] = useState(false);
  const handleEditShow = () => setEditModalShow(true);
  const handleEditClose = () => setEditModalShow(false);

  const [timelineItems, setTimelineItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [deleteLoadingButton, setDeleteLoadingButton] = useState(false);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (id) {
      const fetchData = async () => {
        try {
          const response = await votingServices.getTimeline(id, timezone);
          const timelineItem = response.data.timeline;
          const formattedTimelineItems = [
            {
              title: 'Start Vote',
              date: timelineItem.start_vote,
            },
            {
              title: 'End Vote',
              date: timelineItem.end_vote,
            },
            {
              title: 'Show Count',
              date: timelineItem.show_vote,
            },
          ];

          setTimelineItems(formattedTimelineItems);
        } catch (error) {
          // Handle the error here
        }
      };
      fetchData();
    }
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoadingButton(true);
    try {
      await votingServices.deleteTimeline(id);
      setDeleteLoadingButton(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Timeline deleted successfully.',
      });
      router.reload();
    } catch (error) {
      setDeleteLoadingButton(false);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Timeline</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
          marginBottom: '50px',
        }}
      >
        {timelineItems.length === 0 ? (
          <div className={styles.timelineBox}>
            <div className={styles.containerNoValue}>
              <div>No timeline available</div>
              <div className={styles.buttonNoValueWrapper}>
                <Button onClick={handleShow} className={styles.baseButton}>
                  <div style={{ width: '60px' }}>Add</div>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.buttonYesValue}>
              <Button onClick={handleEditShow} className={styles.baseButton}>
                <div style={{ width: '60px' }}>Edit</div>
              </Button>
              <Button
                onClick={handleDelete}
                className={styles.buttonDelete}
                isLoading={deleteLoadingButton}
                disabled={deleteLoadingButton}
              >
                <div style={{ width: '60px' }}>Delete</div>
              </Button>
            </div>
            <div className={styles.timelineBox}>
              <HorizontalTimeline timelineItems={timelineItems} />
            </div>
          </>
        )}
      </Row>
      <ModalAddTimeline show={modalShow} onHide={() => handleClose()} />
      <ModalEditTimeline
        show={editModalShow}
        onHide={() => handleEditClose()}
      />{' '}
    </div>
  );
}

export default TimelineAdmin;
