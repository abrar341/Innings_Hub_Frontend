import React from 'react'
import { useOutletContext } from 'react-router-dom'

const Matches = () => {
    const [matchesType] = useOutletContext();
    return (
        <div>
            {matchesType} Matches
        </div>
    )
}

export default Matches
