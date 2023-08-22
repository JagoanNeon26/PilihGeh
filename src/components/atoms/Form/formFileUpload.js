import { Field } from 'formik';
import React from 'react';

function FormikFileInput(props) {
  const { name, id, formikProps, ...rest } = props;

  return (
    <div>
      <Field id={id} name={name} {...rest} />
    </div>
  );
}
export default FormikFileInput;
