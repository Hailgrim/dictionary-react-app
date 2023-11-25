import React from 'react';
import { useDispatch } from 'react-redux';

import './WordItem.css';
import { addFavoriteWord, removeFavoriteWord } from '../../store/actions';
import { Word } from '../../libs/types';
import WordItemStar from './WordItemStar';

type WordItemProps = {
  word: Word;
  favorite: boolean;
  DNDStartHandler: React.MouseEventHandler<SVGSVGElement>;
  DNDEnterHandler: React.MouseEventHandler<HTMLDivElement>;
  DNDLeaveHandler: React.MouseEventHandler<HTMLDivElement>;
  DNDEndHandler: React.MouseEventHandler<HTMLDivElement>;
  DNDActive: boolean;
  DNDEnter: boolean;
};

const WordItem: React.FunctionComponent<WordItemProps> = ({
  word,
  favorite,
  DNDEndHandler,
  DNDEnterHandler,
  DNDLeaveHandler,
  DNDStartHandler,
  DNDActive,
  DNDEnter,
}) => {
  const [active, setActive] = React.useState(false);
  const dispatch = useDispatch();

  const rowClickHandler = () => {
    setActive(prev => !prev);
  }

  const starActiveHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    if (favorite) {
      dispatch(removeFavoriteWord(word.meta.uuid));
    } else {
      dispatch(addFavoriteWord(word));
    }
  }

  return (
    <div
      className={`word-row ${active ? 'word-row--active' : ''} ${DNDActive ? 'word-row--dnd-active' : ''} ${DNDEnter ? 'word-row--dnd-enter' : ''}`.trim()}
      onClick={rowClickHandler}
      onMouseEnter={DNDEnterHandler}
      onMouseLeave={DNDLeaveHandler}
      onMouseUp={DNDEndHandler}
    >
      <div className="word-row__dnd">
        <svg className={`word-row__svg ${favorite ? 'word-row__svg-active' : ''}`} viewBox="0 0 612 612" onMouseDown={DNDStartHandler}>
          <g className="word-row__g">
            <path d="M0,95.625v38.25h612v-38.25H0z M0,325.125h612v-38.25H0V325.125z M0,516.375h612v-38.25H0V516.375z" />
          </g>
        </svg>
      </div>
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
