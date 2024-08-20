import { FaPlus } from 'react-icons/fa';
import AddUpdateTournamentDialog from './AddUpdateTournamentDialog';
import { useState } from 'react';

const AddNewButton = () => {

    return (
        <>
            <button className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">
                <FaPlus className="mr-2" />
                Add New
            </button>

        </>
    );
};

export default AddNewButton;
