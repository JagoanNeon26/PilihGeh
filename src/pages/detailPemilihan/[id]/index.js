import React, { useEffect, useState } from 'react';
import Navbar from 'components/molecules/Navbar/navbar';
import Card from 'components/molecules/Card/card';
import { Col, Row } from 'react-bootstrap';
import HorizontalTimeline from 'components/atoms/Timeline/HorizontalTimeline';
import { useRouter } from 'next/router';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2';
import styles from '../../../styles/Home.module.css';

function DetailPemilihan() {
  const router = useRouter();
  const [cardsData, setCardsData] = useState([]);
  const [votingId, setVotingId] = useState({ title: '', organization: '' });
  const [timelineItems, setTimelineItems] = useState([]);
  const [totalVotes, setTotalVotes] = useState({});
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      votingServices
        .getCandidateByIdUsers(id)
        .then((response) => {
          const fetchedData = response.data.getPemilihan;
          setVotingId({
            title: fetchedData.title,
            organization: fetchedData.organization,
          });

          votingServices
            .getCandidateUsers(id)
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
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error Fetching Data',
            text: error.response.data.message,
          });
        });
    }
  }, [id]);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fetchData = async () => {
      try {
        const response = await votingServices.getTimelineUsers(id, timezone);
        const timelineItem = response.data.timeline;
        const formattedTimelineItems = [
          {
            title: 'Start Vote',
            date: timelineItem.start_vote,
          },
          {
            title: 'End Vote',
            date: timelineItem.end_vote,
          },
          {
            title: 'Show Count',
            date: timelineItem.show_vote,
          },
        ];

        setTimelineItems(formattedTimelineItems);
      } catch (error) {
        // Intentionally ignoring this error
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await votingServices.countUsers(id);
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
      <Navbar />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>{votingId.title}</div>
        <div className={styles.organisasiDetailPemilihan}>
          {votingId.organization}
        </div>
      </Row>
      <Row>
        <div className={styles.cardContainer}>
          {cardsData.map((item) => (
            <Card
              key={item.candidateNumber}
              paslon1={item.candidate1Name}
              tag1={item.candidate1Tag}
              paslon2={item.candidate2Name}
              tag2={item.candidate2Tag}
              noCandidate={item.candidateNumber}
              image={item.photo}
              visi={item.visi}
              misi={item.misi}
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
        <div className={styles.realTimeCount}>
          {totalVotes['Total Suara Masuk'] || '-'}
        </div>
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
