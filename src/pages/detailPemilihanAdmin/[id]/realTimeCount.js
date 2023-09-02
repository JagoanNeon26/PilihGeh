import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import votingServices from 'services/voting-services';
import { useRouter } from 'next/router';
import styles from '../../../styles/Home.module.css';
import Swal from 'sweetalert2';

function DetailPemilihan() {
  const [cardsData, setCardsData] = useState([]);
  const [totalVotes, setTotalVotes] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      votingServices
        .getCandidate(id)
        .then((candidateResponse) => {
          const fetchedCandidates = candidateResponse.data.kandidat;
          setCardsData(fetchedCandidates);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Fetching Candidates',
            text: error.response.data.message,
          });
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await votingServices.count(id);
          console.log(response.data);
          setTotalVotes(response.data);
        }
      } catch (error) {
        // Handle errors here
      }
    };

    fetchData();
  }, [id]);

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
        <div className={styles.realTimeCount}>
          {totalVotes['Total Pemilih'] || '0'}
        </div>
        <div className={styles.textRealTimeCount}>Total Voters</div>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '45px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '27px',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <div className={styles.realTimeCountSmall}>
              {totalVotes['Total Vote Sukses'] || '0'}
            </div>
            <div className={styles.textRealTimeCountSmall}>Success Vote</div>
          </div>
          <div>
            <div className={styles.realTimeCountSmall}>
              {totalVotes['Total Belum Vote'] || '0'}
            </div>
            <div className={styles.textRealTimeCountSmall}>Not Vote</div>
          </div>
          <div>
            <div className={styles.realTimeCountSmall}>
              {totalVotes['Total Vote Belum Verifikasi'] || '0'}
            </div>
            <div className={styles.textRealTimeCountSmall}>Pending Vote</div>
          </div>
          <div>
            <div className={styles.realTimeCountSmall}>
              {totalVotes['Total Vote Invalid'] || '0'}
            </div>
            <div className={styles.textRealTimeCountSmall}>Declined Vote</div>
          </div>
        </div>
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
        <div className={styles.realTimeCount}>
          {totalVotes['Total Suara Masuk'] || '-'}
        </div>
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
              {totalVotes[`Count Candidate ${item.candidateNumber}`] || '0'}
            </div>
            <div className={styles.textRealTimeCountSmall}>
              Paslon {item.candidateNumber}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DetailPemilihan;
