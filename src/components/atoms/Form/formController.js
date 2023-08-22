import React from 'react';
import FormInput from './form';
import Textarea from './textAreaForm';
import FormSelect from './formSelect';
import FormFileUpload from './formFileUpload';

function FormController(props) {
  const { control, formikProps, ...rest } = props;
  switch (control) {
    case 'input':
      return <FormInput formikProps={formikProps} {...rest} />;
    case 'textArea':
      return <Textarea formikProps={formikProps} {...rest} />;
    case 'formSelect':
      return <FormSelect formikProps={formikProps} {...rest} />;
    case 'fileUpload':
      return <FormFileUpload formikProps={formikProps} {...rest} />;
    default:
      return null;
  }
}
export default FormController;
