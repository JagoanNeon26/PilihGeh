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
import ModalDeleteEmail from 'components/molecules/Modal/modalDeleteEmail';
import uuid from 'utils/uuid';
import styles from './table.module.css';

function TableManageVoters({ onDataReady }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) throw new Error('No ID provided');

        const response = await votingServices.getAllVoters(id);
        const userData = response.data.user;
        setData(userData);
        onDataReady(userData);

        if (selectedId !== null) {
          const selectedRow = userData.find((row) => row.id === selectedId);
          if (selectedRow) setSelectedEmail(selectedRow.email);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: error.response?.data?.message,
        });
      }
    };

    if (id) fetchData();
  }, [id, selectedId]);

  const handleSendInvitation = async (userId) => {
    try {
      const response = await votingServices.sendTokenVotersById(id, userId);
      Swal.fire({
        icon: 'success',
        title: 'Invitation sent!',
        text: response.data.message,
      });
      router.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message,
      });
    }
  };

  const sortCaret = (order) => (
    <FontAwesomeIcon
      icon={order === 'asc' ? faSortUp : order === 'desc' ? faSortDown : faSort}
      className={styles.iconSort}
    />
  );

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell) => cell || 'User belum terdaftar',
      headerStyle: { width: '150px' },
      sort: true,
      sortCaret,
    },
    {
      dataField: 'status',
      text: 'Status',
      headerStyle: { width: '100px' },
      sort: true,
      sortCaret,
    },
    {
      dataField: 'email',
      text: 'Email',
      headerStyle: { width: '150px' },
      classes: styles.overflowCell,
      sort: true,
      sortCaret,
    },
    {
      dataField: 'id',
      text: 'Delete',
      classes: styles.linkCell,
      formatter: (cell) => (
        <button
          onClick={() => {
            setSelectedId(cell);
            setShowModal(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSelectedId(cell);
              setShowModal(true);
            }
          }}
          type="button"
          tabIndex={0}
        >
          Delete
        </button>
      ),
      headerStyle: { width: '70px' },
    },
    {
      dataField: 'sendToken',
      text: 'Send Token',
      classes: styles.linkCell,
      formatter: (cell, row) => (
        <button
          key={uuid()}
          onClick={() => {
            setSelectedId(cell);
            handleSendInvitation(row.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSelectedId(cell);
              handleSendInvitation(row.id);
            }
          }}
          type="button"
          tabIndex={0}
        >
          Send
        </button>
      ),
      headerStyle: { width: '70px' },
    },
  ];

  const renderNoDataMessage = () => {
    if (data.length === 0) return 'Tidak ada data pemilih';
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
      <ModalDeleteEmail
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedId(null);
        }}
        selectedId={selectedId}
        selectedEmail={selectedEmail}
      />
    </div>
  );
}

export default TableManageVoters;
