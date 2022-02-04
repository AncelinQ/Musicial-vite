import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';
import {
  AdsPage,
  AdsSinglePage,
  BandAdSinglePage,
  MusicianAdSinglePage,
  BandsSinglePage,
  HomePage,
  LoginPage,
  MusiciansSinglePage,
} from './pages';

import { StandardLayout } from './layouts';
import MusiciansPage from './pages/musicians-page';
import BandsPage from './pages/bands-page';
import { ApolloProvider } from '@apollo/client';
import FaunaApolloClient from './utils/fauna-apollo-client.js';

const App: FC = () => {
  return (
    <StandardLayout>
      <ApolloProvider client={FaunaApolloClient}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/ads' element={<AdsPage />} />
            <Route path='band/ads/:id' element={<BandAdSinglePage />} />
            <Route path='musician/ads/:id' element={<MusicianAdSinglePage />} />
            <Route path='/bands' element={<BandsPage />} />
            <Route path='/bands/:id' element={<BandsSinglePage />} />
            <Route path='/musicians' element={<MusiciansPage />} />
            <Route path='/musicians/:id' element={<MusiciansSinglePage />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </StandardLayout>
  );
};

export default App;
