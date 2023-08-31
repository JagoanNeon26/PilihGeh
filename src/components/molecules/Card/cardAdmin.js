import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card as BootstrapCard, Button, Col, Row } from 'react-bootstrap';
import styles from './card.module.css';
import ModalVote from '../Modal/modalVote';
import ModalEditCandidate from '../Modal/modalEditCandidate';

function CardAdmin({ paslon1, paslon2, tag1, tag2, noCandidate, image }) {
  const [modalShow, setModalShow] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const handleAddShow = () => {
    setModalAddShow(true);
  };
  const handleAddClose = () => setModalAddShow(false);

  return (
    <BootstrapCard className={styles.card}>
      <BootstrapCard.Img
        variant="top"
        src={image || '/Paslon 1.png'}
        className={styles.cardImg}
      />
      <BootstrapCard.Body style={{ padding: '0' }}>
        <Row className={styles.cardBody}>
          <Col>
            <BootstrapCard.Title className={styles.textPaslon}>
              {paslon1}
            </BootstrapCard.Title>
          </Col>
          <Col>
            <BootstrapCard.Text className={styles.textDesc}>
              {tag1}
            </BootstrapCard.Text>
          </Col>
        </Row>
        <Row className={styles.cardBody}>
          <Col>
            <BootstrapCard.Title className={styles.textPaslon}>
              {paslon2}
            </BootstrapCard.Title>
          </Col>
          <Col>
            <BootstrapCard.Text className={styles.textDesc}>
              {tag2}
            </BootstrapCard.Text>
          </Col>
        </Row>
        <Row className={styles.cardFooterAdmin}>
          <Button className={styles.buttonModalEdit} onClick={handleAddShow}>
            <div style={{ width: '60px' }}>Edit</div>
          </Button>
          <Button className={styles.buttonModal} onClick={handleShow}>
            <div style={{ width: '60px' }}>Info</div>
          </Button>
        </Row>
        <ModalEditCandidate
          show={modalAddShow}
          onHide={handleAddClose}
          candidateNumber={noCandidate}
        />
        <ModalVote show={modalShow} onHide={handleClose} />
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

CardAdmin.propTypes = {
  paslon1: PropTypes.string.isRequired,
  paslon2: PropTypes.string.isRequired,
  tag1: PropTypes.string.isRequired,
  tag2: PropTypes.string.isRequired,
  noCandidate: PropTypes.number.isRequired,
  image: PropTypes.string,
};

CardAdmin.defaultProps = {
  image: '/Paslon 1.png',
};

export default CardAdmin;
