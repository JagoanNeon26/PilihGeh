import React from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from './form.module.css';

function FormSelect(props) {
  const { name, label, formikProps, selected, disabled, options, ...rest } =
    props;
  return (
    <div className={styles['input-container']}>
      <label htmlFor={name} className={styles['input-label']}>
        {label}
      </label>
      <Field
        as="select"
        className={styles['input-field']}
        id={name}
        name={name}
        values={selected}
        disabled={disabled}
        {...rest}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <div className={styles['input-error']}>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}

export default FormSelect;
