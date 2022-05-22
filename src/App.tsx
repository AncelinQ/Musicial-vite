import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import 'bulma/css/bulma.min.css';
import {
  AdsPage,
  BandAdSinglePage,
  MusicianAdSinglePage,
  BandsSinglePage,
  HomePage,
  LoginPage,
  MusiciansSinglePage,
  RegisterPage,
  PageNotFound,
} from './pages';

import { StandardLayout } from './layouts';
import MusiciansPage from './pages/musicians-page/musicians-page';
import BandsPage from './pages/bands-page/bands-page';
import { ApolloProvider } from '@apollo/client';
import FaunaApolloClient from './common/utils/fauna-apollo-client';
import {
  AuthContextProvider,
  useAuthContext,
} from './common/auth/auth-context';

const AppContent: FC = () => {
  const { actions } = useAuthContext();
  actions.getCurrentUser();

  return (
    <StandardLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/ads' element={<AdsPage />} />
        <Route path='band/ads/:id' element={<BandAdSinglePage />} />
        <Route path='musician/ads/:id' element={<MusicianAdSinglePage />} />
        <Route path='/bands' element={<BandsPage />} />
        <Route path='/bands/:id' element={<BandsSinglePage />} />
        <Route path='/musicians' element={<MusiciansPage />} />
        <Route path='/musicians/:id' element={<MusiciansSinglePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </StandardLayout>
  );
};

const App: FC = () => {
  return (
    <ApolloProvider client={FaunaApolloClient}>
      <Router>
        <AuthContextProvider>
          <AppContent />
        </AuthContextProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
