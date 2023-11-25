import React from 'react';
import { useSelector } from 'react-redux';

import './Page.css';
import Preloader from '../Preloader/Preloader';
import DictionarySearchForm from '../SearchForms/DictionarySearchForm';
import WordItem from '../WordItem/WordItem';
import { Store } from '../../libs/types';

const HomePage: React.FunctionComponent = () => {
  const requestedWords = useSelector<Store, Store['requestedWords']>(state => state.requestedWords);
  const loading = useSelector<Store, Store['wordsLoading']>(state => state.wordsLoading);
  const favoriteWords = useSelector<Store, Store['favoriteWords']>(state => state.favoriteWords);
  const requestError = useSelector<Store, Store['requestError']>(state => state.requestError);

  return (
    <>
      <h1 className="title">Search</h1>
      <div className="page">
        <div className="page__sidebar">
          <DictionarySearchForm />
        </div>
        <div className="page__content">
          {loading && <Preloader />}
          {requestError && <div className="alert">{requestError}</div>}
          {!requestError && !loading && !requestedWords.length && <div className="alert">Nothing found</div>}
          {requestedWords.map(word => (
            <WordItem
              key={word.meta.uuid}
              word={word}
              favorite={favoriteWords.find(item => item.meta.uuid === word.meta.uuid ? true : false) ? true : false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default HomePage;
