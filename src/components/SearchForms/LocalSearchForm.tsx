import React from 'react';
import { useDispatch } from 'react-redux';

import './SearchForm.css';
import { phraseFilter } from '../../store/actions';
import FormCheckbox from './FormCheckbox';

type LocalSearchFormProps = {
  favoritePhrase: string;
  partsOfSpeech: Record<string, string>;
  disabledPartsOfSpeech: string[];
};

const LocalSearchForm: React.FunctionComponent<LocalSearchFormProps> = ({ favoritePhrase, partsOfSpeech, disabledPartsOfSpeech }) => {
  const dispatch = useDispatch();

  const wordChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(phraseFilter(event.currentTarget.value));
  }

  const formSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <form className="search-form" onSubmit={formSubmitHandler}>
      <input className="search-form__input" placeholder="Write the word" name="word" value={favoritePhrase} onChange={wordChangeHandler} />
      {Object.keys(partsOfSpeech).map(key => (
        <FormCheckbox
          key={key}
          name="partsOfSpeech"
          text={key}
          status={!disabledPartsOfSpeech.includes(key)}
        />
      ))}
    </form>
  );
}
export default LocalSearchForm;
