import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import votingServices from 'services/voting-services';
import styles from './table.module.css';

function TableAdmin() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const handleTableRowClick = (id) => {
    router.push(`/detailPemilihanAdmin/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await votingServices.getAdminVoting();
        const pemilihanData = response.data.pemilihan;
        const formattedData = pemilihanData.map((item) => item.Pemilihan);
        setData(formattedData);
      } catch (error) {
        // Intentionally ignoring this error
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
      text: 'Voting Status',
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
              onClick: (e, row) => handleTableRowClick(row.id),
            }}
            rowClasses={styles.tableBody}
            headerClasses={styles.tableHead}
            hover
          />
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
          Anda belum mengikuti voting apa pun.
        </p>
      )}
    </div>
  );
}

export default TableAdmin;
