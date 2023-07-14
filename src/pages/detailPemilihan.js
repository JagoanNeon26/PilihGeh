import React from 'react';
import Navbar from 'components/molecules/Navbar/navbar';
import Card from 'components/molecules/Card/card';
import { Row } from 'react-bootstrap';
import HorizontalTimeline from 'components/atoms/Timeline/HorizontalTimeline';
import styles from '../styles/Home.module.css';

function DetailPemilihan() {
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
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '100px ' }}
        >
          <Card paslon1="Holau" paslon2="Akram" image="/Paslon 1.png" />
          <Card paslon1="Holau" paslon2="Akram" image="/Paslon 2.png" />
          <Card paslon1="Holau" paslon2="Akram" image="/Paslon 3.png" />
        </div>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}
      >
        <div className={styles.judulDetailPemilihan}>Timeline</div>
        <div className={styles.timeline}>
          <HorizontalTimeline timelineItems={timelineItems} />
        </div>
      </Row>
      <Row
        style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}
      >
        <div className={styles.judulDetailPemilihan}>Real Time Count</div>
      </Row>
    </div>
  );
}

export default DetailPemilihan;
