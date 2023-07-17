import React from 'react';
import FormInput from './form';

function FormController(props) {
  const { control, formikProps, ...rest } = props;
  switch (control) {
    case 'input':
      return <FormInput formikProps={formikProps} {...rest} />;
    default:
      return null;
  }
}
export default FormController;
