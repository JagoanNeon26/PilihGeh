import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './form.module.css';

function FormInput(props) {
  const { name, label, formikProps, ...rest } = props;
  return (
    <div className={styles['input-container']}>
      <label className={styles['input-label']} htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        className={styles['input-field']}
        name={name}
        {...rest}
      />
      <div className={styles['input-error']}>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}
export default FormInput;
