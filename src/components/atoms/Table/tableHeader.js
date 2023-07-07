import React from 'react';
import styles from './table.module.css';

function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header} className={styles.header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
