import React from 'react';
import { useStore } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/Pages/HomePage';
import StarredPage from './components/Pages/StarredPage';
import Footer from './components/Footer/Footer';
import { Store } from './libs/types';
import ErrorAlert from './components/Other/ErrorAlert';

const App: React.FunctionComponent = () => {
  const store = useStore<Store>();

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
    };
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} errorElement={<ErrorAlert />} />
          <Route path="/starred" element={<StarredPage />} errorElement={<ErrorAlert />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
