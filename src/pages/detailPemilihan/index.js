import React from 'react';
import Navbar from 'components/molecules/Navbar/navbar';
import Card from 'components/molecules/Card/card';
import { Col, Row } from 'react-bootstrap';
import HorizontalTimeline from 'components/atoms/Timeline/HorizontalTimeline';
import styles from '../../styles/Home.module.css';

function DetailPemilihan() {
  const cardsData = [
    {
      id: 1,
      paslon1: 'Holau',
      paslon2: 'Akram',
      image: '/Paslon 1.png',
      realtimecount: 584,
    },
    {
      id: 2,
      paslon1: 'Holau',
      paslon2: 'Akram',
      image: '/Paslon 2.png',
      realtimecount: 443,
    },
    {
      id: 3,
      paslon1: 'Holau',
      paslon2: 'Akram',
      image: '/Paslon 3.png',
      realtimecount: 222,
    },
  ];

  const totalCount = cardsData.reduce(
    (total, item) => total + item.realtimecount,
    0
  );

  const timelineItems = [
    {
      date: 'January 1, 2023',
      title: 'Voting Day',
    },
    {
      date: 'February 1, 2023',
      title: 'Final Count Day',
    },
    {
      date: 'March 1, 2023',
      title: 'Closing Day',
    },
  ];

  return (
    <div>
      <Navbar />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>
          Pemilihan Ketua Umum Himpunan Mahasiswa Teknik Elektro Universitas
          Lampung
        </div>
        <div className={styles.organisasiDetailPemilihan}>
          Himpunan Mahasiswa Teknik Elektro UNILA
        </div>
      </Row>
      <Row>
        <div className={styles.cardContainer}>
          {cardsData.map((item) => (
            <Card
              key={item.id}
              paslon1={item.paslon1}
              paslon2={item.paslon2}
              image={item.image}
            />
          ))}
        </div>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}
      >
        <div className={styles.judulDetailPemilihan}>Timeline</div>
        <div className={styles.timelineBox}>
          <HorizontalTimeline timelineItems={timelineItems} />
        </div>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}
      >
        <div className={styles.judulDetailPemilihan}>Real Time Count</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '45px',
          gap: '27px',
        }}
      >
        <div className={styles.realTimeCount}>{totalCount}</div>
        <div className={styles.textRealTimeCount}>Total Suara Masuk</div>
      </Row>
      <Row className={styles.realTimeCountSmallWrapper}>
        {cardsData.map((item) => (
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
