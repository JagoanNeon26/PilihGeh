/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from './table.module.css';

function TableAdmin() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("https://api.example.com/data").then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  const [data, setData] = useState([
    {
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      votingStatus: 'Active',
    },
    {
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      votingStatus: 'Active',
    },
    {
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      votingStatus: 'Active',
    },
  ]);

  return (
    <Table hover responsive>
      <thead className={styles.tableHead}>
        <tr style={{ verticalAlign: 'middle' }}>
          <th>Name</th>
          <th>Date</th>
          <th>Voting Status</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((item) => (
          <tr key={data.id} style={{ verticalAlign: 'middle' }}>
            <td style={{ textAlign: 'left', width: '40vw' }}>{item.name}</td>
            <td style={{ width: '15vw' }}>{item.date}</td>
            <td>{item.votingStatus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableAdmin;
