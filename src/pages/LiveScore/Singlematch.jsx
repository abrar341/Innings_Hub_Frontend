import React from 'react'
import { useParams } from 'react-router-dom'

const Singlematch = () => {
    const { matchId } = useParams()
    return (
        <div>
            Match:{matchId}
        </div>
    )
}

export default Singlematch
