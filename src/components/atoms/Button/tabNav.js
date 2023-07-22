import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

function TabButton(props) {
  const { active, onClick, children, to = '' } = props;

  return (
    <Link href={to}>
      <button
        type="button"
        className={`${styles.tabButton} ${active && styles.activeTab}`}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
}

export default TabButton;
