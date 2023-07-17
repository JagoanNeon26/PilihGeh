import React from 'react';
import styles from './table.module.css';

function Table({ children }) {
  return <table className={styles.table}>{children}</table>;
}

export default Table;
