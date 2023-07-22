import React from 'react';
import styles from 'components/atoms/Button/button.module.css';
import { Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';

function BaseButton(props) {
  const {
    variant = 'primary',
    type = 'submit',
    active,
    to = '',
    children,
    disabled = false,
  } = props;

  return (
    <Link href={to}>
      <Button
        type={type}
        active={active}
        className={[
          [styles.btn],
          [variant === 'primary' && styles.primary],
          [variant === 'white' && styles.white],
          [active && styles.primary],
          'btn-check:active',
        ]}
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  );
}
export default BaseButton;

export function CircleButton(props) {
  const { variant = 'white', children } = props;

  return (
    <Dropdown.Toggle
      variant={variant}
      className={[
        styles.circleButton,
        variant === 'white' ? styles.white : '',
        styles.hideCaret, // Add the hideCaret class
      ]}
    >
      {children}
    </Dropdown.Toggle>
  );
}
