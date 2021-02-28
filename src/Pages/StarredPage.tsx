import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { innerSearch, uniquePartsOfSpeech } from '../functions';
import LocalSearchForm from '../Parts/LocalSearchForm';
import WordItemDND from '../Parts/WordItemDND';
import { wordMoveTo } from '../redux/actions';

const StarredPage: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const favoriteWords = useSelector((state: any) => state.favoriteWords);
	const favoritePhrase = useSelector((state: any) => state.favoritePhrase);
	const disabledPartsOfSpeech = useSelector((state: any) => state.disabledPartsOfSpeech);
	const partsOfSpeech = React.useMemo(() => uniquePartsOfSpeech(favoriteWords), [favoriteWords]);
	const [DNDActive, setDNDActive] = React.useState(-1);
	const [DNDEnter, setDNDEnter] = React.useState(-1);

	const favoriteWordsFiltered = React.useMemo(() => {
		let result = [];
		for (let favoriteWord of favoriteWords) {
			let partFind: boolean = false;
			if (disabledPartsOfSpeech.length) {
				if (disabledPartsOfSpeech.find((partOfSpeech: string) => favoriteWord.fl === partOfSpeech ? true : false)) partFind = true;
			}
			if (innerSearch(favoriteWord.meta.stems, favoritePhrase) && !partFind) result.push(favoriteWord);
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

	const DNDEnterHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>, id: number) => {
		if (DNDActive > -1) setDNDEnter(id);
	}

	const DNDLeaveHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>, id: number) => {
		setDNDEnter(-1);
	}

	const DNDEndHandler = (event: React.SyntheticEvent<HTMLOrSVGElement>, id: number) => {
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
							partsOfSpeech={partsOfSpeech}
							disabledPartsOfSpeech={disabledPartsOfSpeech}
							favoritePhrase={favoritePhrase}
						/>
					</div>
					<div className="page__content">
						{!favoriteWordsFiltered.length && <div className="alert">Nothing found</div>}
						{favoriteWordsFiltered.map((word: any, key: number) => (
							<WordItemDND
								key={word.meta.uuid.toString()}
								word={word}
								favorite={true}
								DNDStartHandler={(event: React.SyntheticEvent<HTMLOrSVGElement>) => DNDStartHandler(event, key)}
								DNDEnterHandler={(event: React.SyntheticEvent<HTMLOrSVGElement>) => DNDEnterHandler(event, key)}
								DNDLeaveHandler={(event: React.SyntheticEvent<HTMLOrSVGElement>) => DNDLeaveHandler(event, key)}
								DNDEndHandler={(event: React.SyntheticEvent<HTMLOrSVGElement>) => DNDEndHandler(event, key)}
								DNDActive={DNDActive === key ? true : false}
								DNDEnter={DNDEnter === key ? true : false}
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