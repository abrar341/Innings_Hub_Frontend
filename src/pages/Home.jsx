import React, { useEffect } from 'react';
import Matches_Scroll from './Match/Matches_Scroll';
import ClubRegistrationForm from '../components/ClubRegistrationForm';
import PlayerScroll from './Player/PlayerScroll';
import ImageCarousel from '../components/Crousal/ImageCrousal';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import ViewPostDialog from '../components/Dialogs/ViewPostDialog';

const Home = () => {

    // Empty dependency array ensures this only runs once on mount

    return (
        <>
            <ImageCarousel />
            {/* <Matches_Scroll /> */}

            <PlayerScroll />
        </>
    );
};

export default Home;
