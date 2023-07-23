/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isSmallLogo = width <= 425;

  return (
    <Row className={styles.containerNavbarUser}>
      <Col className={styles.leftNavbar}>
        <Link href="/menuPemilihan">
          <Image
            src={isSmallLogo ? '/Small Logo.png' : '/Logo.png'}
            alt="logo"
            className={styles.logo}
          />
        </Link>
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
