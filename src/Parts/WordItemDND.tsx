import React from 'react';
import { useDispatch } from 'react-redux';
import { addFavoriteWord, removeFavoriteWord } from '../redux/actions';

type WordItemProps = {
	word: any,
	favorite: boolean,
	DNDStartHandler: any,
	DNDEnterHandler: any,
	DNDLeaveHandler: any,
	DNDEndHandler: any,
	DNDActive: boolean,
	DNDEnter: boolean
}

const WordItem: React.FunctionComponent<WordItemProps> = (props) => {
	const [active, setActive] = React.useState(false);
	const dispatch = useDispatch();

	const rowClickHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
		setActive(prev => !prev);
	}

	const starActiveHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>) => {
		event.stopPropagation();
		if (props.favorite) {
			dispatch(removeFavoriteWord(props.word.meta.uuid));
		} else {
			dispatch(addFavoriteWord(props.word));
		}
	}

	return (
		<div
			className={`word-row ${active ? 'word-row-active' : ''} ${props.DNDActive ? 'word-row-dnd-active' : ''} ${props.DNDEnter ? 'word-row-dnd-enter' : ''}`.trim()}
			onClick={rowClickHandler}
			onMouseEnter={props.DNDEnterHandler}
			onMouseLeave={props.DNDLeaveHandler}
			onMouseUp={props.DNDEndHandler}
		>
			<div className="word-row__dnd">
				<svg className={`word-row__svg ${props.favorite ? 'word-row__svg-active' : ''}`} viewBox="0 0 612 612" onMouseDown={props.DNDStartHandler}>
					<g className="word-row__g">
						<path d="M0,95.625v38.25h612v-38.25H0z M0,325.125h612v-38.25H0V325.125z M0,516.375h612v-38.25H0V516.375z"/>
					</g>
				</svg>
			</div>
			<div className="word-row__content">
				<div className="word-row__word">
					{props.word.meta.stems[0]}
					{props.word.meta.stems.map((stem: any, key: number) => {
						if (key) {
							return (
								<span key={`word${props.word.meta.uuid.toString()}${key.toString()}`} className="word-row__subword">, {stem}</span>
							);
						} else {
							return null;
						}
					})}
				</div>
				<div className="word-row__type">{props.word.fl}</div>
				{props.word.hwi?.prs && props.word.hwi?.prs[0] &&
					<div className="word-row__trans">[{props.word.hwi.prs[0].mw}]</div>
				}
				<div className="word-row__def">
					{props.word.shortdef.map((def: any, key: number) => (
						<div className="word-row__text" key={`def${props.word.meta.uuid.toString()}${key.toString()}`}>{def}</div>
					))}
				</div>
			</div>
			<div className="word-row__star">
				<svg className={`word-row__svg ${props.favorite ? 'word-row__svg-active' : ''}`} viewBox="0 0 512 512" onClick={starActiveHandler}>
					<g className="word-row__g">
						<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842" />
					</g>
				</svg>
			</div>
		</div>
	);
}
export default WordItem;