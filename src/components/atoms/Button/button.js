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
