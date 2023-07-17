import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card as BootstrapCard, Button, Col, Row } from 'react-bootstrap';
import styles from './card.module.css';
import ModalVote from '../Modal/modalVote';

function Card({ paslon1, paslon2, image }) {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  return (
    <BootstrapCard className={styles.card}>
      <BootstrapCard.Img variant="top" src={image} className={styles.cardImg} />
      <BootstrapCard.Body style={{ padding: '0' }}>
        <Row style={{ margin: '15px 15px 0 15px' }}>
          <Col style={{ marginBottom: '14px' }}>
            <BootstrapCard.Title className={styles.textPaslon}>
              {paslon1}
            </BootstrapCard.Title>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BootstrapCard.Text className={styles.textDesc}>
              Ketua
            </BootstrapCard.Text>
          </Col>
        </Row>
        <Row style={{ margin: '0px 15px 15px 15px' }}>
          <Col>
            <BootstrapCard.Title className={styles.textPaslon}>
              {paslon2}
            </BootstrapCard.Title>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BootstrapCard.Text className={styles.textDesc}>
              Wakil Ketua
            </BootstrapCard.Text>
          </Col>
        </Row>
        <Row style={{ width: '331px', margin: '0' }}>
          <Button className={styles.buttonModal} onClick={handleShow}>
            <div style={{ width: '60px' }}>Add</div>
          </Button>
        </Row>
        <ModalVote show={modalShow} onHide={() => handleClose()} />
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

Card.propTypes = {
  paslon1: PropTypes.string.isRequired,
  paslon2: PropTypes.string.isRequired,
};

export default Card;
