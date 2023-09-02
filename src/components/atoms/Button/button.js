import React, { forwardRef } from 'react';
import styles from 'components/atoms/Button/button.module.css';
import { Button, Dropdown, Spinner } from 'react-bootstrap';

function BaseButton(props) {
  const {
    variant = 'primary',
    type = 'submit',
    active,
    children,
    disabled = false,
    isLoading = false,
  } = props;

  return (
    <Button
      type={type}
      active={active}
      className={[
        [styles.btn],
        [variant === 'primary' && styles.primary],
        [variant === 'white' && styles.white],
        [variant === 'red' && styles.red],
        [active && styles.primary],
        'btn-check:active',
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </Button>
  );
}
export default BaseButton;

export const CircleButton = forwardRef((props, ref) => {
  const { variant = 'white', children } = props;

  return (
    <Dropdown.Toggle
      ref={ref}
      variant={variant}
      className={[
        styles.circleButton,
        variant === 'white' ? styles.white : '',
        styles.hideCaret,
      ]}
    >
      {children}
    </Dropdown.Toggle>
  );
});

CircleButton.displayName = 'CircleButton';
