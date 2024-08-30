import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddNewPlayerButton = () => {
    return (
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
            <FaPlus className="mr-2" />
            Add New Player
        </button>
    )
}

export default AddNewPlayerButton
