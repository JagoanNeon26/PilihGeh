import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './form.module.css';

function Textarea(props) {
  const { name, label, formikProps, ...rest } = props;
  const isRequired = rest.required || false;

  return (
    <div className={styles['input-container']}>
      <label className={styles['input-label']} htmlFor={name}>
        {label}
        {isRequired && <span className={styles['input-required']}> *</span>}
      </label>
      <Field
        className={styles['text-area-field']}
        as="textarea"
        id={name}
        name={name}
        {...rest}
      />
      <div className={styles['input-error']}>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
}
export default Textarea;
