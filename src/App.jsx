// src/App.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Teams from './pages/Team/Teams';
import Series from './pages/Series/Series';
import Players from './pages/Team/pages/Players';
import TeamProfileLayout from './pages/Team/TeamProfileLayout';
import TeamStats from './pages/Team/pages/TeamStats';
import TeamSqaud from './pages/Team/pages/TeamSquad'
import SeriesPageLayout from './pages/Series/SeriesProfileLayout';
import Fixtures from './pages/Series/pages/Fixtures';
import Results from './pages/Series/pages/Results';
import PointTable from './pages/Series/pages/PointTable';
import Home from './pages/Home';
import MatchesLayout from './pages/LiveScore/MatchesLayout'
import LiveScores from './pages/LiveScore/pages/LiveScores'
import Schedules from './pages/LiveScore/pages/Schedules'
import LoginForm from './pages/Account/LoginForm';
import SignUpForm from './pages/Account/SIgnUpForm';
import VerificationCodeInput from './pages/Account/VerificationCodeInput';
// import ForgotPassword from './pages/Forms/ForgotPassword';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
        <Route path="signup" element={<SignUpForm />} />
        <Route path="verification" element={<VerificationCodeInput />} />
        <Route path="all-matches" element={<MatchesLayout />}>
          {/* <Route  element={<LiveScores />} /> */}
          <Route index element={<LiveScores />} />
          <Route index path='live-scores' element={<LiveScores />} />
          <Route path='schedules' element={<Schedules />} />
          <Route path='results' element={<LiveScores />} />
        </Route>
        <Route path="team" element={<Teams />} />
        <Route path='team/:teamName' element={<TeamProfileLayout />}>
          <Route index element={<Home />} />
          <Route path='squad' element={<TeamSqaud />} />
          <Route path='players' element={<Players />} />
          <Route path='stats' element={<TeamStats />} />
          {/* <Route path='matches' element={<Matches />} /> */}
        </Route>
        <Route path="series" element={<Series />} />
        <Route path='series/:tourName' element={<SeriesPageLayout />}>
          <Route index path='fixtures' element={<Fixtures />} />
          <Route path='results' element={<Results />} />
          <Route path='point-table' element={<PointTable />} />
        </Route>

        <Route path="players" element={<Players />} />
      </Route>
    ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
