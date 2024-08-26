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
// import ForgotPassword from './pages/Forms/ForgotPassword';
import store from './store';
import { Provider } from 'react-redux';
import ScorerLayout from './pages/Scorer/ScorerLayout';
import Upcoming from './pages/Scorer/pages/Upcoming';
import Live from './pages/Scorer/pages/Live';
import Result from './pages/Scorer/pages/Result';
import Dashboard from './pages/AdminPages/Dashboard';
import ClubManager from './pages/ClubManager/ClubManager';
import Competitions from './pages/Competitions/Competitions';
import TournamentProfileLayout from './pages/Competitions/TournamentProfileLayout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="all-matches" element={<MatchesLayout />}>
          {/* <Route  element={<LiveScores />} /> */}
          <Route index element={<LiveScores />} />
          <Route index path='live-scores' element={<LiveScores />} />
          <Route path='schedules' element={<Schedules />} />
          <Route path='results' element={<LiveScores />} />
        </Route>
        <Route path="team" element={<Teams />} />
        <Route path='team/:teamName' element={<TeamProfileLayout />}>
          <Route path='squad' element={<TeamSqaud />} />
          <Route path='players' element={<Players />} />
          <Route path='stats' element={<TeamStats />} />
          {/* <Route path='matches' element={<Matches />} /> */}
        </Route>
        <Route path="series" element={<Series />} />
        <Route path='series/:tourName' element={<SeriesPageLayout />}>
          <Route path='fixtures' element={<Fixtures />} />
          <Route path='results' element={<Results />} />
          <Route path='point-table' element={<PointTable />} />
        </Route>
        <Route path="players" element={<Players />} />
        <Route path='scorer' element={<ScorerLayout />}>
          {/* on scorer login navigate to "/scorer/live" */}
          <Route path='live' element={<Live />} />
          <Route path='upcoming' element={<Upcoming />} />
          <Route path='results' element={<Result />} />
        </Route>
        <Route path='admin' element={<Dashboard />} />
        <Route path='admin/competitions' element={<Competitions />} />
        <Route path='admin/competitions/:id' element={<TournamentProfileLayout />} />

        <Route path='club-manager' element={<ClubManager />}>
        </Route>
      </Route>
    ));

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  );
}

export default App;
