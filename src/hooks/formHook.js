import {useState} from 'react';


// helper hook for forms to make text fields less verbose
// inputs:
// type = the type of text field,
// placeholder = the text shown on the field before input given
// outputs:
// outputs an object with a ready event handler,
// a function to clear the field and the variable to hold field value
//
// it's used a lot in the component CreateRule if you need an example.
export const useField = (type, placeholder) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    placeholder,
    onChange,
    reset,
  };
};
