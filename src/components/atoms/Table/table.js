import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import votingServices from 'services/voting-services';
import styles from './table.module.css';

function TableVote() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const handleTableRowClick = (id, status) => {
    if (status !== 'Tidak Bisa Diakses') {
      router.push(`/detailPemilihan/${id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await votingServices.getVoting();
        const pemilihanData = response.data.pemilihan;
        const formattedData = pemilihanData.map((item) => item.Pemilihan);
        setData(formattedData);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          router.push('/');
        } else {
          // Handle other errors if needed
        }
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      dataField: 'title',
      text: 'Name',
      headerStyle: { width: '200px' },
    },
    {
      dataField: 'organization',
      text: 'Organization',
      headerStyle: { width: '150px' },
    },
    {
      dataField: 'status',
      text: 'Status',
      headerStyle: { width: '100px' },
    },
  ];

  return (
    <div className={styles.table}>
      {Array.isArray(data) && data.length > 0 ? (
        <div className="table-responsive">
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            rowEvents={{
              onClick: (e, row) => handleTableRowClick(row.id, row.status),
            }}
            rowClasses={styles.tableBody}
            headerClasses={styles.tableHead}
            hover
          />
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
          You have not followed any voting.
        </p>
      )}
    </div>
  );
}

export default TableVote;
