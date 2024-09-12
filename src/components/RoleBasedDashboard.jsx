import { useSelector } from 'react-redux';
import AdminDashboard from '../pages/AdminPages/Dashboard';
import ScorerDashboard from '../pages/Scorer/ScorerLayout';
import ClubManagerDashboard from '../pages/ClubManager/ClubManager';
import PlayerDashboard from '../pages/Player/PlayerHome';
import { Navigate } from 'react-router-dom';

const RoleBasedDashboard = () => {
    const { userType } = useSelector((state) => state.auth);

    switch (userType) {
        case 'admin':
            return <AdminDashboard />;
        case 'scorer':
            return <ScorerDashboard />;
        case 'club-manager':
            return <ClubManagerDashboard />;
        case 'player':
            return <PlayerDashboard />;
        default:
            return <Navigate to="/account/login" replace />;
    }
};

export default RoleBasedDashboard;
