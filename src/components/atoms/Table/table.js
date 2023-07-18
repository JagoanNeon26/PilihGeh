/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'react-bootstrap';
import styles from './table.module.css';

function TableVote() {
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
      voteStatus: 'YES',
      votingStatus: 'Active',
    },
    {
      name: 'Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas Lampung',
      date: '30.6.2023-12-7-2023',
      voteStatus: 'NO',
      votingStatus: 'Active',
    },
    {
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
          <tr key={item.id} style={{ verticalAlign: 'middle' }}>
            <td
              style={{
                textAlign: 'left',
                width: '40vw',
                textOverflow: 'ellipsis',
              }}
            >
              {item.name}
            </td>
            <td style={{ width: '15vw' }}>{item.date}</td>
            <td style={{ width: '8vw' }}>
              {voteStatusToLogo(item.voteStatus)}
            </td>
            <td>{item.votingStatus}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableVote;
