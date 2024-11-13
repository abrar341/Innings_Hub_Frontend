import React from 'react'
import Matches_Scroll from './Match/Matches_Scroll'
import ClubRegistrationForm from '../components/ClubRegistrationForm'
import PlayerScroll from './Player/PlayerScroll'
import ImageCarousel from '../components/ImageCrousal'

const Home = () => {
    return (
        <>

            <ImageCarousel />
            <Matches_Scroll />
            <PlayerScroll />
        </>
    )
}

export default Home

