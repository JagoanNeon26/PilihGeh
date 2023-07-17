import React from 'react';
import FormInput from './form';
import Textarea from './textAreaForm';

function FormController(props) {
  const { control, formikProps, ...rest } = props;
  switch (control) {
    case 'input':
      return <FormInput formikProps={formikProps} {...rest} />;
    case 'textArea':
      return <Textarea formikProps={formikProps} {...rest} />;
    default:
      return null;
  }
}
export default FormController;
