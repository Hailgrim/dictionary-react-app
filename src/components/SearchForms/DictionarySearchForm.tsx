import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchForm.css';
import { getWords } from '../../store/actions';
import { Store } from '../../libs/types';

const DictionarySearchForm: React.FunctionComponent = () => {
  const searchPhrase = useSelector<Store, Store['searchPhrase']>(state => state.searchPhrase);
  const [word, serWord] = React.useState(searchPhrase);
  const similarWords = useSelector<Store, Store['similarWords']>(state => state.similarWords);
  const dispatch = useDispatch();

  const wordChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    serWord(event.currentTarget.value);
  };

  const formSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getWords(word));
  };

  const similarWordHandler = (event: React.SyntheticEvent<HTMLDivElement>, selectedWord: string) => {
    event.preventDefault();
    serWord(selectedWord);
    dispatch(getWords(selectedWord));
  };

  return (
    <form onSubmit={formSubmitHandler} className="search-form">
      <input className="search-form__input" placeholder="Write the word and press Enter" name="word" value={word} onChange={wordChangeHandler} required />
      {similarWords.map(similarWord => (
        <div className="search-form__link" onClick={event => similarWordHandler(event, similarWord)} key={similarWord}>{similarWord}</div>
      ))}
    </form>
  );
}
export default DictionarySearchForm;
