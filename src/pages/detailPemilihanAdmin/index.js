import React, { useState } from 'react';
import Card from 'components/molecules/Card/card';
import { Button, Row } from 'react-bootstrap';
import ModalAddCandidate from 'components/molecules/Modal/modalAddCandidate';
import NavbarAdmin from 'components/molecules/Navbar/navbarAdmin';
import styles from '../../styles/Home.module.css';

function DetailPemilihan() {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const cardsData = [];

  return (
    <div>
      <NavbarAdmin />
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
          {cardsData.length === 0 ? (
            <div className={styles.containerNoValue}>
              <div>No cards available</div>
              <div className={styles.buttonNoValueWrapper}>
                <Button onClick={handleShow} className={styles.buttonAddVote}>
                  <div style={{ width: '60px' }}>Add</div>
                </Button>
              </div>
            </div>
          ) : (
            cardsData.map((item) => (
              <Card
                key={item.id}
                paslon1={item.paslon1}
                paslon2={item.paslon2}
                image={item.image}
              />
            ))
          )}
        </div>
      </Row>
      <ModalAddCandidate show={modalShow} onHide={() => handleClose()} />
    </div>
  );
}

export default DetailPemilihan;
