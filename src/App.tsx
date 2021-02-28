import React from 'react';
import { useStore } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Parts/Header';
import Home from './Pages/HomePage';
import Starred from './Pages/StarredPage';
import Footer from './Parts/Footer';

const App: React.FunctionComponent = () => {
	const store = useStore();

	React.useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			try {
				window.localStorage.setItem('favoritePhrase', JSON.stringify(store.getState().favoritePhrase));
				window.localStorage.setItem('favoriteWords', JSON.stringify(store.getState().favoriteWords));
				window.localStorage.setItem('disabledPartsOfSpeech', JSON.stringify(store.getState().disabledPartsOfSpeech));
			} catch (error) {
				alert('Произошла ошибка');
				console.log(error);
			}
		});

		return () => {
			unsubscribe();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/starred">
						<Starred />
					</Route>
				</Switch>
			</main>
			<Footer />
		</BrowserRouter>
	);
}
export default App;