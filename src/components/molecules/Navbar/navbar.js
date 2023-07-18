import React, { useState, useEffect } from 'react';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsProfilePage(router.pathname === '/profile');
  }, [router.pathname]);

  const handleGoBack = () => {
    router.push(-1);
  };

  return (
    <Row className={styles.container}>
      <Col>
        <div className={styles.leftNavbar}>
          {isProfilePage && (
            <CircleButton
              type="submit"
              onClick={handleGoBack}
              style={{ marginLeft: 10 }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </CircleButton>
          )}
          <Image src="/Logo.png" alt="logo" className={styles.logo} />
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
