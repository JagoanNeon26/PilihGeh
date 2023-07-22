import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import styles from '../../styles/Home.module.css';

function DetailPemilihan() {
  const candidateData = [
    {
      id: 1,
      realtimecount: 584,
    },
  ];

  const votersData = [
    {
      id: 1,
      name: 'Success',
      data: 1,
    },
    {
      id: 2,
      name: 'Pending',
      data: 1,
    },
    {
      id: 3,
      name: 'Not',
      data: 1,
    },
    {
      id: 4,
      name: 'Declined',
      data: 1,
    },
  ];

  const totalCountCandidate = candidateData.reduce(
    (total, item) => total + item.realtimecount,
    0
  );

  const totalCountVoters = votersData.reduce(
    (total, item) => total + item.data,
    0
  );

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>Real Time Count</div>
      </Row>
      {/* Voters Data */}
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          gap: '27px',
        }}
      >
        <div className={styles.realTimeCount}>{totalCountVoters}</div>
        <div className={styles.textRealTimeCount}>Total Voters</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '45px',
          gap: '27px',
        }}
      >
        {votersData.map((item) => (
          <Col
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '27px',
            }}
          >
            <div className={styles.realTimeCountSmall}>{item.data}</div>
            <div className={styles.textRealTimeCountSmall}>
              {item.name} Voting
            </div>
          </Col>
        ))}
      </Row>
      {/* Candidate Data */}
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          gap: '27px',
        }}
      >
        <div className={styles.realTimeCount}>{totalCountCandidate}</div>
        <div className={styles.textRealTimeCount}>Total Vote to Candidate</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '45px',
          gap: '27px',
        }}
      >
        {candidateData.map((item) => (
          <Col
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '27px',
            }}
          >
            <div className={styles.realTimeCountSmall}>
              {item.realtimecount}
            </div>
            <div className={styles.textRealTimeCountSmall}>
              Paslon {item.id}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DetailPemilihan;
