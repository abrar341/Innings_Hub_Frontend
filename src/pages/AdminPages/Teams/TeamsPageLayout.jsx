import React, { useEffect } from 'react';
import { useGetAllTeamsQuery } from '../../../slices/team/teamApiSlice'; // Adjust the import path according to your project structure
import { useDispatch } from 'react-redux';
import { set_Team } from '../../../slices/team/teamSlice';
import CreateTeamDialog from './CreateTeamDialog';

const TeamsPageLayout = () => {

    const { data, isLoading, isError, error } = useGetAllTeamsQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(set_Team({ data: data.data }));
        }
    }, [dispatch, data, isLoading, isError]);
    return (
        <>
            <div className="bg-gray-100 mx-auto gap-3 p-4 pb-0 bg-gray-50 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
                <form className="sm:col-span-2 lg:order-none">
                    <div className="relative w-full">
                        <input type="search" className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 rounded-s-lg" placeholder="Search players, teams, or names..." required />
                        <button type="submit" className="flex justify-center items-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full w-10 text-white bg-blue-500 rounded-e-lg">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>

                <CreateTeamDialog />
            </div>
            {/* <PlayerList isAdmin={true} /> */}
        </>
    );
}

export default TeamsPageLayout;
