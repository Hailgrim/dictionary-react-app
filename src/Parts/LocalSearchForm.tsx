import React from 'react';
import { useDispatch } from 'react-redux';
import { phraseFilter } from '../redux/actions';
import FormCheckbox from './FormCheckbox';

type LocalSearchFormProps = {
	favoritePhrase: string,
	partsOfSpeech: any,
	disabledPartsOfSpeech: any
}

const LocalSearchForm: React.FunctionComponent<LocalSearchFormProps> = (props) => {
	const dispatch = useDispatch();

	const wordChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
		dispatch(phraseFilter(event.currentTarget.value));
	}

	const formSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	return (
		<form className="search-form" onSubmit={formSubmitHandler}>
			<input className="search-form__input" placeholder="Write the word" name="word" value={props.favoritePhrase} onChange={wordChangeHandler} />
			{Object.keys(props.partsOfSpeech).map((item: any) => (
				<FormCheckbox
					key={item}
					name="partsOfSpeech"
					text={item}
					status={props.disabledPartsOfSpeech.find((part: string) => part === item ? true : false) ? false : true}
				/>
			))}
		</form>
	);
}
export default LocalSearchForm;