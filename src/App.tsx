import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';
import {
  AdsPage,
  AdsSinglePage,
  BandsSinglePage,
  HomePage,
  LoginPage,
  MusiciansSinglePage,
} from './pages';

import { StandardLayout } from './layouts';
import MusiciansPage from './pages/musicians-page';
import BandsPage from './pages/bands-page';

const App: FC = () => {
  return (
    <StandardLayout>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/ads' element={<AdsPage />} />
          <Route path='/ads/:id' element={<AdsSinglePage />} />
          <Route path='/bands' element={<BandsPage />} />
          <Route path='/bands/:id' element={<BandsSinglePage />} />
          <Route path='/musicians' element={<MusiciansPage />} />
          <Route path='/musicians/:id' element={<MusiciansSinglePage />} />
        </Routes>
      </Router>
    </StandardLayout>
  );
};

export default App;
