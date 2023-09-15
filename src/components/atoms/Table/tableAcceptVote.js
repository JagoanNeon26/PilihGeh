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
import styles from './table.module.css';

function TableAcceptVote({ onDataReady }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setselectedPhoto] = useState('');
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error('No ID provided');
        const response = await votingServices.getVerifiedVote(id);
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
  ];

  const renderNoDataMessage = () => {
    if (data.length === 0) return 'Currently no accepted vote.';
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
    </div>
  );
}

export default TableAcceptVote;
