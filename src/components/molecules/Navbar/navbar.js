import React, { useState } from 'react';
import Image from 'next/image';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

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
            <FontAwesomeIcon icon={faBell} />
          </CircleButton>
          <Dropdown show={isOpen} onToggle={handleDropdownToggle}>
            <Dropdown.Toggle
              as={CircleButton}
              type="submit"
              style={{ pointerEvents: 'none' }}
            >
              <FontAwesomeIcon icon={faGear} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Dropdown menu items */}
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
}

export default Navbar;
