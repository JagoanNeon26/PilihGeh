import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Row } from 'react-bootstrap';
import CardAdmin from 'components/molecules/Card/cardAdmin';
import ModalAddCandidate from 'components/molecules/Modal/modalAddCandidate';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import votingServices from 'services/voting-services';
import Swal from 'sweetalert2'; // Import SweetAlert2 library
import styles from '../../../styles/Home.module.css';

function DetailPemilihanAdmin() {
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const [cardsData, setCardsData] = useState([]);
  const [votingId, setVotingId] = useState({ title: '', organization: '' });
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      votingServices
        .getAdminVotingById(id)
        .then((response) => {
          const fetchedData = response.data.getPemilihan;
          setVotingId({
            title: fetchedData.title,
            organization: fetchedData.organization,
          });

          votingServices
            .getCandidate(id)
            .then((candidateResponse) => {
              // Renamed the parameter to candidateResponse
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

  return (
    <div>
      <NavbarAdmin />
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.judulDetailPemilihan}>{votingId.title}</div>
        <div className={styles.organisasiDetailPemilihan}>
          {votingId.organization}
        </div>
      </Row>
      <Row>
        {cardsData.length > 0 && (
          <div className={styles.buttonYesValue}>
            <Button
              onClick={() => setModalShow(true)}
              className={styles.buttonAddVote}
            >
              <div style={{ width: '60px' }}>Add</div>
            </Button>
          </div>
        )}
        <div className={styles.cardContainer}>
          {cardsData.map((item) => (
            <CardAdmin
              key={item.candidateNumber}
              paslon1={item.candidate1Name}
              tag1={item.candidate1Tag}
              paslon2={item.candidate2Name}
              tag2={item.candidate2Tag}
              image={item.photo}
              noCandidate={item.candidateNumber}
            />
          ))}
          {cardsData.length === 0 && (
            <div className={styles.containerNoValue}>
              <div>No cards available</div>
              <div className={styles.buttonNoValueWrapper}>
                <Button
                  onClick={() => setModalShow(true)}
                  className={styles.buttonAddVote}
                >
                  <div style={{ width: '60px' }}>Add</div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Row>
      <ModalAddCandidate show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default DetailPemilihanAdmin;
