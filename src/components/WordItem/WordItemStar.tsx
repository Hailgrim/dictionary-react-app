import React from 'react';

type WordItemProps = {
  favorite: boolean;
  onClick: (event: React.SyntheticEvent<HTMLOrSVGElement>) => void;
};

const WordItemStar: React.FunctionComponent<WordItemProps> = ({ favorite, onClick }) => {
  return (
    <div className="word-row__star">
      <svg className={`word-row__svg ${favorite ? 'word-row__svg-active' : ''}`} viewBox="0 0 512 512" onClick={onClick}>
        <g className="word-row__g">
          <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842" />
        </g>
      </svg>
    </div>
  );
};
export default WordItemStar;
