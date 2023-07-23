/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'react-bootstrap';
import styles from './table.module.css';
import { useRouter } from 'next/router';

function TableVote() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("https://api.example.com/data").then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  const router = useRouter();

  const handleTableRowClick = (id) => {
    // Replace '/path/to/another/page' with the actual URL you want to navigate to
    router.push(`/detailPemilihan/${id}`);
  };

  const [data, setData] = useState([
    {
      id: 1,
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      voteStatus: 'YES',
      votingStatus: 'Active',
    },
    {
      id: 2,
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      voteStatus: 'NO',
      votingStatus: 'Active',
    },
    {
      id: 3,
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      voteStatus: 'YES',
      votingStatus: 'Active',
    },
  ]);

  const voteStatusToLogo = (voteStatus) => {
    if (voteStatus === 'YES') {
      return <FontAwesomeIcon icon={faCheck} />;
    }
    if (voteStatus === 'NO') {
      return <FontAwesomeIcon icon={faTimes} />;
    }
    return voteStatus;
  };

  return (
    <Table hover responsive>
      <thead className={styles.tableHead}>
        <tr style={{ verticalAlign: 'middle' }}>
          <th>Name</th>
          <th>Date</th>
          <th>Vote Status</th>
          <th>Voting Status</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((item) => (
          <tr
            key={item.id}
            style={{ verticalAlign: 'middle' }}
            onClick={() => handleTableRowClick(item.id)} // Call the click handler on row click
          >
            <td className={styles.nameRow}>{item.name}</td>
            <td className={styles.dateRow}>{item.date}</td>
            <td>{voteStatusToLogo(item.voteStatus)}</td>
            <td>{item.votingStatus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableVote;
