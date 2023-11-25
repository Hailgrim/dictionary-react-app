import React from 'react';
import { useDispatch } from 'react-redux';

import './WordItem.css';
import { addFavoriteWord, removeFavoriteWord } from '../../store/actions';
import { Word } from '../../libs/types';
import WordItemStar from './WordItemStar';

type WordItemProps = {
  word: Word;
  favorite: boolean;
};

const WordItem: React.FunctionComponent<WordItemProps> = ({ word, favorite }) => {
  const [active, setActive] = React.useState(false);
  const dispatch = useDispatch();

  const rowClickHandler = () => {
    setActive(prev => !prev);
  };

  const starActiveHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    if (favorite) {
      dispatch(removeFavoriteWord(word.meta.uuid));
    } else {
      dispatch(addFavoriteWord(word));
    }
  };

  return (
    <div className={`word-row ${active ? 'word-row--active' : ''}`} onClick={rowClickHandler}>
      <div className="word-row__content">
        <div className="word-row__word">
          {word.meta.stems[0]}
          {word.meta.stems.map((stem, key) => {
            if (key > 0) {
              return (
                <span key={`word.${word.meta.uuid}.${key}`} className="word-row__subword">, {stem}</span>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="word-row__type">{word.fl}</div>
        {word.hwi?.prs?.[0] &&
          <div className="word-row__trans">[{word.hwi.prs[0].mw}]</div>
        }
        <div className="word-row__def">
          {word.shortdef.map((def, key) => (
            <div key={`def.${word.meta.uuid}.${key}`} className="word-row__text">{def}</div>
          ))}
        </div>
      </div>
      <WordItemStar favorite={favorite} onClick={starActiveHandler} />
    </div>
  );
}
export default WordItem;
