import React, { useState } from 'react';
import Image from 'next/image';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col, Dropdown } from 'react-bootstrap';
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
            <Image src="/Bell.png" alt="bell" width={26} height={30} />
          </CircleButton>
          <Dropdown show={isOpen} onToggle={handleDropdownToggle}>
            <Dropdown.Toggle
              as={CircleButton}
              type="submit"
              style={{ pointerEvents: 'none' }}
            >
              <Image src="/User.png" alt="user" width={24} height={26} />
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
