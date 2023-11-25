import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Page.css';
import { uniquePartsOfSpeech } from '../../libs/functions';
import LocalSearchForm from '../SearchForms/LocalSearchForm';
import WordItemDND from '../WordItem/WordItemDND';
import { wordMoveTo } from '../../store/actions';
import { Store } from '../../libs/types';

const StarredPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const favoriteWords = useSelector<Store, Store['favoriteWords']>(state => state.favoriteWords);
  const favoritePhrase = useSelector<Store, Store['favoritePhrase']>(state => state.favoritePhrase);
  const disabledPartsOfSpeech = useSelector<Store, Store['disabledPartsOfSpeech']>(state => state.disabledPartsOfSpeech);
  const partsOfSpeech = React.useMemo(() => uniquePartsOfSpeech(favoriteWords), [favoriteWords]);
  const [DNDActive, setDNDActive] = React.useState(-1);
  const [DNDEnter, setDNDEnter] = React.useState(-1);

  const favoriteWordsFiltered = React.useMemo(() => {
    const result = [];
    for (const favoriteWord of favoriteWords) {
      if (
        disabledPartsOfSpeech.indexOf(favoriteWord.fl) === -1 &&
        // favoriteWord.meta.stems.indexOf(favoritePhrase) > -1
        favoriteWord.meta.stems.some(stem => stem.includes(favoritePhrase))
      ) {
        result.push(favoriteWord);
      }
    }
    return result;
  }, [favoriteWords, favoritePhrase, disabledPartsOfSpeech]);

  const DNDStatusHandler = () => {
    document.removeEventListener('mouseup', DNDStatusHandler);
    setDNDActive(-1);
    setDNDEnter(-1);
  }

  const DNDStartHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    document.addEventListener('mouseup', DNDStatusHandler);
    setDNDActive(id);
  }

  const DNDEnterHandler = (id: number) => {
    if (DNDActive > -1) {
      setDNDEnter(id);
    }
  }

  const DNDLeaveHandler = () => {
    setDNDEnter(-1);
  }

  const DNDEndHandler = (id: number) => {
    if (DNDActive > -1) {
      dispatch(wordMoveTo(DNDActive, id));
    }
  }

  return (
    <>
      <h1 className="title">Starred words</h1>
      {favoriteWords.length ? (
        <div className="page">
          <div className="page__sidebar">
            <LocalSearchForm
              favoritePhrase={favoritePhrase}
              partsOfSpeech={partsOfSpeech}
              disabledPartsOfSpeech={disabledPartsOfSpeech}
            />
          </div>
          <div className="page__content">
            {favoriteWordsFiltered.length === 0 && <div className="alert">Nothing found</div>}
            {favoriteWordsFiltered.map((word, key) => (
              <WordItemDND
                key={word.meta.uuid}
                word={word}
                DNDStartHandler={event => DNDStartHandler(event, key)}
                DNDEnterHandler={() => DNDEnterHandler(key)}
                DNDLeaveHandler={() => DNDLeaveHandler()}
                DNDEndHandler={() => DNDEndHandler(key)}
                DNDActive={DNDActive === key}
                DNDEnter={DNDEnter === key}
                favorite
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="alert">Add your favorite words from the dictionary search</div>
      )}
    </>
  );
}
export default StarredPage;
