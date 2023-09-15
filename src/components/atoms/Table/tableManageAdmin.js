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
import ModalDeleteEmailAdmin from 'components/molecules/Modal/modalDeleteEmailAdmin';
import styles from './table.module.css';

function TableManageAdmin({ onDataReady }) {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('No ID provided.');
        }
        const response = await votingServices.getAllAdmin(id);
        const userData = response.data.admin;
        setData(userData);
        onDataReady(userData);
        if (selectedId !== null) {
          const selectedRow = userData.find(
            (row) => row.user_id === selectedId
          );
          if (selectedRow) {
            setSelectedEmail(selectedRow.email);
          }
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: error.response?.data?.message,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, selectedId]);

  const sortCaret = (order) => {
    const iconStyle = {
      marginLeft: '8px',
      fontSize: '12px',
    };
    return (
      <FontAwesomeIcon
        icon={
          order === 'asc' ? faSortUp : order === 'desc' ? faSortDown : faSort
        }
        style={iconStyle}
      />
    );
  };

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell) => (!cell ? 'User belum terdaftar' : cell),
      headerStyle: { width: '150px' },
      classes: styles.overflowCell,
      sort: true,
      sortCaret,
    },
    {
      dataField: 'isJoin',
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
      dataField: 'user_id',
      text: 'Delete',
      classes: styles.linkCell,
      formatter: (cell) => (
        <span
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
          role="button"
          tabIndex={0}
        >
          Delete
        </span>
      ),
      headerStyle: { width: '70px' },
    },
  ];

  const renderNoDataMessage = () => {
    if (data.length === 0) {
      return 'Currently no data voters.';
    }
    if (!id) {
      return 'No ID provided.';
    }
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
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
          {renderNoDataMessage()}
        </p>
      )}
      <ModalDeleteEmailAdmin
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

export default TableManageAdmin;
