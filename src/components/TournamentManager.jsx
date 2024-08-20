import React, { useState } from "react";
import AddUpdateTournamentDialog from "./AddUpdateTournamentDialog";

function TournamentManager({ teams }) {
    const [open, setOpen] = useState(false);
    const [tournamentToUpdate, setTournamentToUpdate] = useState(null);

    const handleAddNewClick = () => {
        setTournamentToUpdate(null); // Reset any previous tournament data
        setOpen(true); // Open the dialog
    };

    return (
        <div>
            <button onClick={handleAddNewClick}>Add New Tournament</button>

            <AddUpdateTournamentDialog
                open={open}
                setOpen={setOpen}
                tournamentToUpdate={tournamentToUpdate}
                teams={teams}
            />


        </div>
    );
}

export default TournamentManager;
