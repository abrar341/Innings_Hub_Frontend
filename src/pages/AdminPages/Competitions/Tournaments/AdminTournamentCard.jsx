import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { formatDate } from '../../../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import AlertNote from '../../../../components/AlertNote'; // Import the AlertNote component
import { useDeleteTournamentMutation } from '../../../../slices/tournament/tournamentApiSlice';
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { deleteSingleTournament } from '../../../../slices/tournament/tornamentSlice';
import CreateTournamentDialog from './Dialogs/CreateTournamentDialog';

const AdminTournamentCard = ({ tournament }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();
  const [deleteTournament, { isLoading }] = useDeleteTournamentMutation();
  const dispatch = useDispatch()
  const handleTournamentClick = () => {
    navigate(`/admin/competitions/${tournament._id}/squads`);
  };

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteTournament(id);
      toast.success("Tournament deleted successfully!");
      setIsAlertOpen(false);
      dispatch(deleteSingleTournament(id));
    } catch (error) {
      toast.error(error?.data?.message || "Error deleting tournament");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
            Completed
          </span>
        </div>
        <div className="flex space-x-2">
          <button
          >
            <CreateTournamentDialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              action="edit"
              tournamentData={tournament}
            />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={handleDeleteClick}
          >
            <FaTrashAlt className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="text-center mt-6">
        <h5 className="font-semibold text-lg text-bold text-gray-800">{tournament.name}-S{tournament.season}</h5>
        <div className="text-gray-500 mt-3">
          <p className="flex justify-center items-center">
            <FaCalendarAlt className="text-green-500 mr-2" />
            <span className='text-sm'>{formatDate(tournament.startDate)}</span>
            <span className="mx-2">-</span>
            <FaCalendarAlt className="text-green-500 mr-2" />
            <span className='text-sm'>{formatDate(tournament.endDate)}</span>
          </p>
          <p className="flex justify-center items-center mt-2">
            <FaUsers className="text-green-500 mr-2" />
            <span className='text-base'>{tournament?.squads.length} Teams</span>
          </p>
        </div>
        <div className="mt-6">
          <Link
            onClick={handleTournamentClick}
            className="inline-block bg-blue-600 text-white rounded px-4 py-1 text-sm font-medium hover:bg-blue-700 transition-colors duration-150"
          >
            View
          </Link>
        </div>
      </div>

      {/* Render the AlertNote component */}
      <AlertNote
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onConfirm={() => handleConfirmDelete(tournament._id)}
        content="This action cannot be undone. This will permanently delete the tournament."
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminTournamentCard;
