/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import ModalViewPhoto from 'components/molecules/Modal/modalViewPhoto';
import uuid from 'utils/uuid';
import ModalRejectVote from 'components/molecules/Modal/modalRejectVote';
import styles from './table.module.css';

function TablePendingVote({ onDataReady }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPhoto, setselectedPhoto] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error('No ID provided');
        const response = await votingServices.getPendingVote(id);
        const userData = response.data;
        setData(userData);
        onDataReady(userData);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: error.response?.data?.message,
        });
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleAccept = async (voteId, userId) => {
    const acceptData = {
      voteId,
      userId,
      validity: 1,
    };
    try {
      const response = await votingServices.verifyVote(id, acceptData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.response?.data?.message,
      });
    }
  };

  const handleReject = (voteId, userId) => {
    setSelectedId(voteId);
    setSelectedUserId(userId);
    setShowRejectModal(true);
  };

  const sortCaret = (order) => (
    <FontAwesomeIcon
      icon={order === 'asc' ? faSortUp : order === 'desc' ? faSortDown : faSort}
      className={styles.iconSort}
    />
  );

  const handleViewPhoto = (photoUrl) => {
    setselectedPhoto(photoUrl);
    setShowModal(true);
  };

  const columns = [
    {
      dataField: 'User.name',
      text: 'Name',
      headerStyle: { width: '150px' },
      classes: styles.overflowCell,
      sort: true,
      sortCaret,
    },
    {
      dataField: 'User.personal_data',
      text: 'Personal Data ID',
      headerStyle: { width: '150px' },
      classes: styles.overflowCell,
      sort: true,
      sortCaret,
    },
    {
      dataField: 'view',
      text: 'Photo',
      classes: styles.deleteCell,
      formatter: (cell, row) => (
        <button
          onClick={() => handleViewPhoto(row.user_photo)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleViewPhoto(row.user_photo);
            }
          }}
          type="button"
          tabIndex={0}
        >
          View
        </button>
      ),
      headerStyle: { width: '70px' },
    },
    {
      dataField: 'Accept',
      text: 'Accept',
      classes: styles.linkCell,
      formatter: (cell, row) => (
        <button
          key={uuid()}
          onClick={() => {
            setSelectedId(cell);
            handleAccept(row.id, row.user_id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSelectedId(cell);
              handleAccept(row.id, row.user_id);
            }
          }}
          type="button"
          tabIndex={0}
        >
          Accept
        </button>
      ),
      headerStyle: { width: '70px' },
    },
    {
      dataField: 'Reject',
      text: 'Reject',
      classes: styles.linkCell,
      formatter: (cell, row) => (
        <button
          onClick={() => handleReject(row.id, row.user_id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleReject(row.id, row.user_id);
            }
          }}
          type="button"
          tabIndex={0}
        >
          Reject
        </button>
      ),
      headerStyle: { width: '70px' },
    },
  ];

  const renderNoDataMessage = () => {
    if (data.length === 0) return 'Currently no pending vote.';
    if (!id) return 'No ID provided.';
    return 'Loading data...';
  };

  return (
    <div className={styles.table}>
      {Array.isArray(data) && data.length > 0 ? (
        <div className="table-responsive">
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            rowClasses={styles.tableBodyManage}
            headerClasses={styles.tableHead}
            sort={{ dataField: 'name', order: 'asc' }}
          />
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'white', padding: '30px' }}>
          {renderNoDataMessage()}
        </p>
      )}
      <ModalViewPhoto
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setselectedPhoto('');
        }}
        selectedPhoto={selectedPhoto}
      />
      <ModalRejectVote
        show={showRejectModal}
        onHide={() => {
          setSelectedId(null);
          setSelectedUserId(null);
          setShowRejectModal(false);
        }}
        selectedId={selectedId}
        selectedUserId={selectedUserId}
      />
    </div>
  );
}

export default TablePendingVote;
