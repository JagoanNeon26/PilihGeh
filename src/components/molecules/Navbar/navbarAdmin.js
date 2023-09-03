/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { CircleButton } from 'components/atoms/Button/button';
import { Row, Col, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import TabButton from 'components/atoms/Button/tabNav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthService from 'services/auth-services';
import styles from './navbar.module.css';

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  /* Logo Navbar */
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
  /* Logo Navbar */

  /* Dropdown Navbar */
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };
  /* Dropdown Navbar */

  /* Tabs Navbar */
  useEffect(() => {
    const { pathname } = router;

    if (pathname.includes('realTimeCount')) {
      setActiveTab('realTimeCount');
    } else if (pathname.includes('timeline')) {
      setActiveTab('timeline');
    } else if (pathname.includes('manageVoters')) {
      setActiveTab('manageVoters');
    } else if (pathname.includes('manageAdmin')) {
      setActiveTab('manageAdmin');
    } else if (pathname.includes('manageVote')) {
      setActiveTab('manageVote');
    } else if (pathname.includes('settings')) {
      setActiveTab('settings');
    } else {
      setActiveTab('dashboard');
    }
  }, [router.pathname]);
  /* Tabs Navbar */

  return (
    <>
      <Row className={styles.container}>
        <Col>
          <div className={styles.leftNavbar}>
            <Link href="/menuPemilihan">
              <Image
                src={isSmallLogo ? '/Small Logo.png' : '/Logo.png'}
                alt="logo"
                className={styles.logo}
              />
            </Link>
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
              <Dropdown.Menu variant="dark" style={{ fontSize: '14px' }}>
                {/* Dropdown menu items */}
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      {/* Tabs Navbar */}
      <Row className={styles.containerTabs}>
        <Col>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}`}
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/realTimeCount`}
            active={activeTab === 'realTimeCount'}
            onClick={() => setActiveTab('realTimeCount')}
          >
            Real Time Count
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/timeline`}
            active={activeTab === 'timeline'}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/manageVoters`}
            active={activeTab === 'manageVoters'}
            onClick={() => setActiveTab('manageVoters')}
          >
            Manage Voters
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/manageAdmin`}
            active={activeTab === 'manageAdmin'}
            onClick={() => setActiveTab('manageAdmin')}
          >
            Manage Admin
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/manageVote`}
            active={activeTab === 'manageVote'}
            onClick={() => setActiveTab('manageVote')}
          >
            Manage Vote
          </TabButton>
          <TabButton
            to={`/detailPemilihanAdmin/${router.query.id}/settings`}
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </TabButton>
        </Col>
      </Row>
    </>
  );
}

export default NavbarAdmin;
