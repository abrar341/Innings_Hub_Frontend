import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TournamentsList from './TournamentsList'
import AddNewButton from '../../components/AddNewButton'
import AddUpdateTournamentDialog from '../../components/AddUpdateTournamentDialog'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../components/ui/dialog';
import { FaPlus } from 'react-icons/fa';
import CreateTournamentDialog from './CreateTournamentDialog'


const CompetitionsLayout = () => {
    const [open, setOpen] = useState(false);
    const [tournamentToUpdate, setTournamentToUpdate] = useState(null);
    const teams = [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
        { id: 3, name: "Team C" },
        // Add more teams as necessary
    ];
    const handleAddNewClick = () => {
        setTournamentToUpdate(null); // Reset any previous tournament data
        setOpen(true); // Open the dialog
    };
    return (
        <>
            <div className=" bg-gray-100 mx-auto gap-3  p-4 pb-0  bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
                <div className=" flex items-center ">
                    <Link to='' className="bg-blue-600 rounded-lg text-white hover:text-white text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">
                        Ongoing
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Upcoming
                    </Link>
                    <Link to='' className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4  hover:text-gray-600">
                        Concluded
                    </Link>

                </div>
                <form class="order-last sm:col-span-2 lg:col-span-1 lg:order-none ">
                    <div class="relative w-full">
                        <input type="search" class="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg " placeholder="Search teams, tournament name......" required />
                        <button type="submit" class="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500  rounded-e-lg ">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </form>

                {/* <AddNewButton handleAddNewClick={handleAddNewClick} /> */}

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">
                            <FaPlus className="mr-2" />
                            Add New
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateTournamentDialog />
                    </DialogContent>
                </Dialog>
            </div>
            <TournamentsList />
            <AddUpdateTournamentDialog
                open={open}
                setOpen={setOpen}
                tournamentToUpdate={tournamentToUpdate}
                teams={teams}
            />
        </>
    )
}

export default CompetitionsLayout
