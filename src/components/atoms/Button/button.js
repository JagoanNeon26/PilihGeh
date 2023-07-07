import React from 'react';
import styles from 'components/atoms/Button/button.module.css';
import { Button } from 'react-bootstrap';

function BaseButton(props) {
  const {
    variant = 'primary',
    type = 'submit',
    active,
    children,
    disabled = false,
  } = props;

  return (
    <Button
      type={type}
      active={active}
      className={[
        [styles.btn],
        [variant === 'primary' && styles.primary],
        [variant === 'black' && styles.black],
        [active && styles.primary],
        'btn-check:active',
      ]}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
export default BaseButton;

export function CircleButton(props) {
  const { variant = 'black', children } = props;

  return (
    <Button
      className={[styles.circleButton, variant === 'black' ? styles.black : '']}
    >
      {children}
    </Button>
  );
}
