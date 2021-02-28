import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWords } from '../redux/actions';

const DictionarySearchForm: React.FunctionComponent = () => {
	const searchPhrase = useSelector((state: any) => state.searchPhrase);
	const [word, serWord] = React.useState(searchPhrase);
	const similarWords = useSelector((state: any) => state.similarWords);
	const dispatch = useDispatch();

	const wordChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
		serWord(event.currentTarget.value);
	}

	const formSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(getWords(word));
	}

	const similarWordHandler = (event: React.SyntheticEvent<HTMLDivElement>, selectedWord: string) => {
		event.preventDefault();
		serWord(selectedWord);
		dispatch(getWords(selectedWord));
	}

	return (
		<form onSubmit={formSubmitHandler} className="search-form">
			<input className="search-form__input" placeholder="Write the word and press Enter" name="word" value={word} onChange={wordChangeHandler} required />
			{similarWords.map((similarWord: any) => (
				<div className="search-form__link" onClick={(event) => similarWordHandler(event, similarWord)} key={similarWord.toString()}>{similarWord}</div>
			))}
		</form>
	);
}
export default DictionarySearchForm;