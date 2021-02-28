import React from 'react';
import { useDispatch } from 'react-redux';
import { partOfSpeechFilterAdd, partOfSpeechFilterRemove } from '../redux/actions';

type FormCheckboxProps = {
	name: string,
	status: boolean,
	text: string
}

const FormCheckbox: React.FunctionComponent<FormCheckboxProps> = (props) => {
	const dispatch = useDispatch();

	const partChangeHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
		if (event.currentTarget.checked) {
			dispatch(partOfSpeechFilterRemove(props.text));
		} else {
			dispatch(partOfSpeechFilterAdd(props.text));
		}
	}

	return (
		<label className="search-form__label">
			{props.status ? (
				<input className="search-form__checkbox" type="checkbox" name={props.name} onChange={partChangeHandler} defaultChecked={true} />
			) : (
				<input className="search-form__checkbox" type="checkbox" name={props.name} onChange={partChangeHandler} defaultChecked={false} />
			)}
			<span className="search-form__span">{props.text}</span>
		</label>
	);
}
export default FormCheckbox;