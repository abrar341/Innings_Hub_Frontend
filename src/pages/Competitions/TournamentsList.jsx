import React from 'react'
import TournamentCard from './TournamentCard'
import LoginDialog from './LoginDialog'

const TournamentsList = () => {
    return (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 bg-gray-50  ">
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
            <LoginDialog />
        </div>
    )
}

export default TournamentsList
