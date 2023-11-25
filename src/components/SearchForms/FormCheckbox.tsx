import React from 'react';
import { useDispatch } from 'react-redux';

import { partOfSpeechFilterAdd, partOfSpeechFilterRemove } from '../../store/actions';

type FormCheckboxProps = {
  name: string;
  status: boolean;
  text: string;
};

const FormCheckbox: React.FunctionComponent<FormCheckboxProps> = ({ name, status, text }) => {
  const dispatch = useDispatch();

  const partChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      dispatch(partOfSpeechFilterRemove(text));
    } else {
      dispatch(partOfSpeechFilterAdd(text));
    }
  }

  return (
    <label className="search-form__label">
      <input className="search-form__checkbox" type="checkbox" name={name} onChange={partChangeHandler} defaultChecked={status} />
      <span className="search-form__span">{text}</span>
    </label>
  );
}
export default FormCheckbox;
