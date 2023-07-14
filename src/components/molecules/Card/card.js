// components/Card.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card as BootstrapCard, Col, Row } from 'react-bootstrap';
import BaseButton from 'components/atoms/Button/button';
import styles from './card.module.css';

function Card({ paslon1, paslon2, image }) {
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
          <BaseButton variant="primary" type="submit">
            View
          </BaseButton>
        </Row>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

Card.propTypes = {
  paslon1: PropTypes.string.isRequired,
  paslon2: PropTypes.string.isRequired,
};

export default Card;
