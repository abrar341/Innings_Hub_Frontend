import React from 'react';
import { format } from 'date-fns';


const TournamentProfileHeader = ({ tournament }) => {
  console.log(tournament);

  return (
    <div className="container-fluid  p-0 m-0 py-5 bg-opacity-75">
      <div className="container py-3">
        <div className="flex flex-wrap items-center">
          <div className="p-4 sm:w-7/12 w-full flex flex-col sm:flex-row  items-center mb-3 sm:mb-0">
            <img
              className="rounded-full bg-gray-100 mr-4"
              height="120"
              width="120"
              src="https://d2l63a9diffym2.cloudfront.net/competition-logos/m5cPcc1jaBhvblCerpQeIX6WJ1W78lNicPKLPl2G.jpg"
              alt="Desert Cricket Champions League Edition-2 2023-2024"
            />
            <div className="text-black">
              <h3 className="text-left text-2xl font-bold mb-1">
                {tournament?.name}
              </h3>
              <p className="text-left font-semibold mb-1">{tournament?.tournamentType}</p>
              <p className="text-left">
                <span className="inline-flex text-sm  items-center">
                  <i className="fa fa-calendar  text-green-500 mr-1"></i> {format(Date(tournament?.startDate), "yyyy-MM-dd")} -
                  <i className="fa fa-calendar  text-green-500 mr-1"></i>{format(Date(tournament?.endDate), "yyyy-MM-dd")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentProfileHeader;
