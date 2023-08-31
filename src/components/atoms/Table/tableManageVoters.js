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
import styles from './table.module.css';

function TableManageVoters({ onDataReady }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await votingServices.getAllVoters(id);
          const userData = response.data.user;
          setData(userData);
          onDataReady(userData);

          if (selectedId !== null) {
            setSelectedId((prevSelectedId) => {
              const selectedRow = userData.find(
                (row) => row.id === prevSelectedId
              );
              if (selectedRow) {
                setSelectedEmail(selectedRow.email);
              }
              return prevSelectedId;
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: error.message,
          });
        }
      };
      fetchData();
    }
  }, [id, selectedId]);

  const handleSendInvitation = (userId) => {
    votingServices
      .sendTokenVotersById(id, userId)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Invitation sent!',
          text: response.data.message,
        });
        router.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const sortCaret = (order) => {
    if (order === 'asc') {
      return <FontAwesomeIcon icon={faSortUp} style={{ marginLeft: '10px' }} />;
    }
    if (order === 'desc') {
      return (
        <FontAwesomeIcon icon={faSortDown} style={{ marginLeft: '10px' }} />
      );
    }
    return <FontAwesomeIcon icon={faSort} style={{ marginLeft: '10px' }} />;
  };

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell) => {
        if (!cell) {
          return 'User belum terdaftar';
        }
        return cell;
      },
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
      classes: styles.deleteCell,
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
      dataField: 'id',
      text: 'Send Token',
      classes: styles.sendCell,
      formatter: (cell, row) => (
        <button
          onClick={() => {
            setSelectedId(cell);
            handleSendInvitation(id, row.id);
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
          Send
        </button>
      ),
      headerStyle: { width: '70px' },
    },
  ];

  const renderNoDataMessage = () => {
    if (data.length === 0) {
      return 'Currently no data voters.';
    }
    if (id) {
      return 'Loading data...';
    }
    return 'No ID provided.';
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
