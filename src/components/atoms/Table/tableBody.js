/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './table.module.css';

function TableBody({ data }) {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
