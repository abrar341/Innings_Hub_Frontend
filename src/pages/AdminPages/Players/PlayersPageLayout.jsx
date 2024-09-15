import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CreatePlayerDialog from './CreatePlayerDialog';
import PlayerList from './PlayerList';
import { useGetAllPlayersQuery } from '../../../slices/player/playerApiSlice';
import { setPlayers } from '../../../slices/player/playerSlice';
import { useDispatch } from 'react-redux';
import { useGetClubPlayersQuery } from '../../../slices/club/clubApiSlice';

const PlayersPageLayout = () => {

    const { data, isLoading, isError, error } = useGetClubPlayersQuery();


    console.log(data);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoading && !isError && data) {
            dispatch(setPlayers({ data: data.data }));
        }
    }, [dispatch, data, isLoading, isError]);
    return (
        <>
            <PlayerList />
        </>
    );
}

export default PlayersPageLayout;
