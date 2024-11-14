// src/App.jsx
import React from 'react';
import Cookies from 'js-cookie';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Teams from './pages/Team/Teams';
import Series from './pages/Series/Series';
import PlayersListing from './pages/Team/pages/Players';
import TeamProfileLayout from './pages/Team/TeamProfileLayout';
import TeamStats from './pages/Team/pages/TeamStats';
import TeamSqaud from './pages/Team/pages/TeamSquad';
import SeriesPageLayout from './pages/Series/SeriesProfileLayout';
import PointTable from './pages/Series/pages/PointTable';
import Home from './pages/Home';
import MatchesLayout from './pages/LiveScore/MatchesLayout';
import LiveScores from './pages/LiveScore/pages/LiveScores';
import Schedules from './pages/LiveScore/pages/Schedules';
import { store, persistor } from './store';
import { Provider, useDispatch } from 'react-redux';
import Upcoming from './pages/Scorer/pages/Upcoming';
import Live from './pages/Scorer/pages/Live';
import Result from './pages/Scorer/pages/Result';
import Dashboard from './pages/AdminPages/Dashboard';
import ClubManager from './pages/ClubManager/ClubManager';
import Competitions from './pages/AdminPages/Competitions/Competitions';
import TournamentProfileLayout from './pages/AdminPages/Competitions/Tournaments/TournamentProfileLayout';
import PlayerProfile from './pages/Player/PlayerProfile';
import Players from './pages/Player/Players';
import PlayersPageLayout from './pages/AdminPages/Players/PlayersPageLayout';
import TeamsPageLayout from './pages/AdminPages/Teams/TeamsPageLayout';
import Squads from './pages/AdminPages/Competitions/Tournaments/SingleTournament.jsx/Squads';
import ScoreCard from './pages/Match/ScoreCard/ScoreCard';
import MatchSummery from './pages/Match/ScoreCard/MatchSummery';
import ScoreCard_Innings from './pages/Match/ScoreCard/ScoreCard_Innings';
import Overs from './pages/Match/ScoreCard/Overs';
import MatchInfo from './pages/Match/ScoreCard/MatchInfo';
import PlayingEleven from './pages/Match/ScoreCard/PlayingEleven';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import EmailVerificationPage from './components/EmailVerificationPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import { PersistGate } from 'redux-persist/integration/react';
import ClubManagerDashboard from './pages/ClubManager/ClubManagerDashboard';
import ClubRegistrationForm from './components/ClubRegistrationForm';
import Profile from './pages/ClubManager/Profile';
import Clubs from './pages/AdminPages/Clubs/Clubs';
import { useGetUserInfoQuery } from './slices/auth/usersApiSlice';
import DashboardLayout from './pages/AdminPages/DashboardLayout';
import Matches from './pages/AdminPages/Competitions/Tournaments/SingleTournament.jsx/Matches';
import Scorer from './components/Scorer';
import Viewer from './components/Viewer';
import ScoreButtons from './components/ScorerCardButtons/ScoreButtons';
import RegisterTeamToTournament from './pages/ClubManager/Tournaments';
import ScorerLayout from './pages/Scorer/ScorerLayout';
import ScorerLayout1 from './components/scorer/ScorerLayout';
import UpcomingItem from './components/upcomingitem';
import Side from './components/Side';
import UpdateProfile from './pages/Profile/UpdateProfile';
import MatchClickDialog from './components/MathcClickDialog';
import Clicks from './pages/Match/ScoreCard/Clicks';
import DrawsAndRounds from './pages/AdminPages/Competitions/Tournaments/SingleTournament.jsx/DrawsAndRounds';
import Standings from './pages/AdminPages/Competitions/Tournaments/SingleTournament.jsx/Standings';
import ScorerPage from './pages/AdminPages/Scorer/ScorerPage';
import ClubDetailsPage from './components/Dialogs/ClubDetail';
import AssignMatchesPage from './components/AssignMatchesPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ChangePassword from './pages/Profile/ChangePassword';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/regular-user/profile' element={<UpdateProfile />} >
          <Route path="profile" element={<ProfileInfo />} />
          <Route path="password" element={<ChangePassword />} />
        </Route>
        <Route path='/s' element={<MatchClickDialog />} />
        <Route path='/side' element={<Side />} />
        <Route path='/item' element={<UpcomingItem />} />
        <Route path='/runner' element={<ScorerLayout1 />} />
        <Route path='/viewer' element={<Viewer />} />
        <Route path='account'>
          <Route path='login' element={<LoginPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='verify' element={<EmailVerificationPage />} />
          <Route path='register-club' element={<ClubRegistrationForm />} />
        </Route>

        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="all-matches" element={<MatchesLayout />}>
          <Route index element={<LiveScores />} />
          <Route path='live-scores' element={<LiveScores />} />
          <Route path='schedules' element={<Schedules />} />
          <Route path='results' element={<LiveScores />} />
        </Route>
        <Route path="match/:matchId" element={<ScoreCard />}>
          <Route path='summery' element={<MatchSummery />} />
          <Route path='innings' element={<ScoreCard_Innings />} />
          <Route path='overs' element={<Overs />} />
          <Route path='photos' element={<Clicks />} />
          <Route path='match-info' element={<MatchInfo />} />
          <Route path='playing-eleven' element={<PlayingEleven />} />
        </Route>

        {/* Role-Specific Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />} >
            <Route path='admin' element={<Dashboard />} />
            <Route path='/admin/competitions' element={<Competitions isAdmin={true} />} />
            <Route path='/admin/scorers' element={<ScorerPage />} />
            <Route path='/admin/players' element={<PlayersPageLayout />} />
            <Route path='/admin/assign-matches' element={<AssignMatchesPage />} />

            <Route path='/admin/clubs' element={<Clubs />} >
            </Route>
            <Route path='/admin/clubs/club-detail' element={<ClubDetailsPage />} />
            <Route path='/admin/competitions/:id' element={<TournamentProfileLayout />} >
              <Route path='squads' element={<Squads />} />
              <Route path='matches' element={<Matches type={"tournament"} />} />
              <Route path='draws' element={<DrawsAndRounds />} />
              <Route path='point-table' element={<Standings />} />
            </Route>
          </Route>
          <Route path='/admin/profile' element={<UpdateProfile />} >
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['club-manager']} />}>
          <Route element={<DashboardLayout />} >
            <Route path='club-manager' element={<ClubManager />}>
              <Route path='dashboard' element={<ClubManagerDashboard />} />
              <Route path='dashboard/players' element={<PlayersPageLayout />} />
              <Route path='dashboard/teams' element={<TeamsPageLayout />} >
                <Route path='team/:id' element={<TeamProfileLayout />} />
              </Route>
              <Route path='dashboard/squads' element={<Squads />} />
              <Route path='dashboard/club-detail' element={<ClubDetailsPage />} />
            </Route>
            <Route path="/club-manager/profile" element={<UpdateProfile />}>
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>

            <Route path='/dashboard/tournaments' element={<RegisterTeamToTournament />} />
            <Route path='tournaments' element={<RegisterTeamToTournament />} />
          </Route>
        </Route>


        <Route element={<ProtectedRoute allowedRoles={['scorer']} />}>
          <Route path='scorer' element={<ScorerLayout />}>
            <Route path='live' element={<Live />} />
            <Route path='upcoming' element={<Upcoming />} />
            <Route path='results' element={<Result />} />
          </Route>
          <Route path='/runner/:matchId' element={<Scorer />} />
          <Route path="/scorer/profile" element={<UpdateProfile />}>
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="password" element={<ChangePassword />} />
          </Route>

        </Route>

        {/* Public Routes */}
        {/* <Route path="clubs" element={<Clubs />} /> */}
        < Route path="team" element={< Teams />} />
        < Route path='/team/:id' element={< TeamProfileLayout />} >
          <Route path='squad' element={<TeamSqaud />} />
          <Route path='players' element={<PlayersListing />} />
          <Route path='stats' element={<TeamStats />} />
          <Route path='matches' element={<Matches type={"team"} />} />
        </ Route>
        <Route path="series" element={<Series />} />
        <Route path='series/:id' element={<SeriesPageLayout />} >
          <Route path='fixtures' element={<Matches type={"tournament"} />} />
          <Route path='point-table' element={<Standings />} />
        </Route>
        <Route path="players" element={<Players />} />
        <Route path="/player/:id" element={<PlayerProfile />} />
      </Route >
    )
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;