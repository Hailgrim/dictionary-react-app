import React from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../Parts/Preloader';
import DictionarySearchForm from '../Parts/DictionarySearchForm';
import WordItem from '../Parts/WordItem';

const HomePage: React.FunctionComponent = () => {
	const requestedWords = useSelector((state: any) => state.requestedWords);
	const loading = useSelector((state: any) => state.wordsLoading);
	const favoriteWords = useSelector((state: any) => state.favoriteWords);
	const requestError = useSelector((state: any) => state.requestError);

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
					{requestedWords.map((word: any) => (
						<WordItem
							key={word.meta.uuid.toString()}
							word={word}
							favorite={favoriteWords.find((item: any) => item.meta.uuid === word.meta.uuid ? true : false) ? true : false}
						/>
					))}
				</div>
			</div>
		</>
	);
}
export default HomePage;