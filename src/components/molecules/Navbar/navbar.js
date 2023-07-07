import React from 'react';
import Image from 'next/image';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';

function Navbar() {
  return (
    <Row className={styles.container}>
      <Col>
        <div className={styles.logo}>
          <Image src="/Logo.png" alt="logo" layout="fill" />
        </div>
      </Col>
      <Col className={styles.icon}>
        <div className={styles.iconWrapper}>
          <CircleButton type="submit">
            <Image src="/Bell.png" alt="bell" width={26} height={30} />
          </CircleButton>
          <div className={styles.verticalCenter}>
            <CircleButton type="submit">
              <Image src="/User.png" alt="bell" width={24} height={26} />
            </CircleButton>
            <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: '20px' }} />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Navbar;
