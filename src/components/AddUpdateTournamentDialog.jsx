import React, { useState, useEffect } from "react";
import useBodyScrollLock from "../customhook//useBodyScrollLock";

function AddUpdateTournamentDialog({ open, setOpen, tournamentToUpdate, teams }) {
  const [formValues, setFormValues] = useState({
    name: "",
    shortName: "",
    startDate: "",
    endDate: "",
    tourType: "",
    ballType: "",
    teamIds: [],
    venue: "",
    logo: null,
  });
  const [isPending, setIsPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Use custom hook to lock body scroll when modal is open
  useBodyScrollLock(open);

  useEffect(() => {
    if (open && tournamentToUpdate) {
      setFormValues(tournamentToUpdate);
    } else {
      setFormValues({
        name: "",
        shortName: "",
        startDate: "",
        endDate: "",
        tourType: "",
        ballType: "",
        teamIds: [],
        venue: "",
        logo: null,
      });
    }
  }, [open, tournamentToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: files[0] }));
  };

  const handleTeamChange = (teamId, checked) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      teamIds: checked
        ? [...prevValues.teamIds, teamId]
        : prevValues.teamIds.filter((id) => id !== teamId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    const action = tournamentToUpdate ? updateTournament : createTournament;
    action({ ...tournamentToUpdate, ...formValues })
      .then(() => {
        setIsPending(false);
        setOpen(false);
        setShowAlert(false);
      })
      .catch(() => {
        setIsPending(false);
      });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity ${open ? "block" : "hidden"
        }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6  max-w-md w-full w-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {tournamentToUpdate ? "Update" : "Add"} Tournament
          </h2>
        </div>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tournament Name
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Tournament name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Short Name
              <input
                type="text"
                name="shortName"
                value={formValues.shortName}
                onChange={handleInputChange}
                placeholder="Short name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
              <input
                type="date"
                name="startDate"
                value={formValues.startDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date
              <input
                type="date"
                name="endDate"
                value={formValues.endDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tour Type
              <select
                name="tourType"
                value={formValues.tourType}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a type</option>
                <option value="Open">Open</option>
                <option value="School">School</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ball Type
              <select
                name="ballType"
                value={formValues.ballType}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a type</option>
                <option value="Leather">Leather</option>
                <option value="Cork">Cork</option>
                <option value="Tennis">Tennis</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Teams
            </label>
            <div className="team-list">
              {teams?.length ? (
                teams.map((team) => (
                  <label key={team.id} className="block text-gray-700">
                    <input
                      type="checkbox"
                      checked={formValues.teamIds.includes(team.id)}
                      onChange={(e) =>
                        handleTeamChange(team.id, e.target.checked)
                      }
                      className="mr-2 leading-tight"
                    />
                    {team.name}
                  </label>
                ))
              ) : (
                <p className="text-gray-500">No teams available</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Venue
              <input
                type="text"
                name="venue"
                value={formValues.venue}
                onChange={handleInputChange}
                placeholder="Venue"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Logo
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isPending}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isPending && "opacity-50 cursor-not-allowed"
                }`}
            >
              {isPending
                ? tournamentToUpdate
                  ? "Updating..."
                  : "Adding..."
                : tournamentToUpdate
                  ? "Update"
                  : "Add"}
            </button>
          </div>
        </form>
        {showAlert && (
          <div className="mt-4 p-4 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700">
            <p>
              We've noticed changes in the participating teams. These changes
              may affect ongoing matches.
            </p>
            <div className="mt-2">
              <button
                onClick={() => setShowAlert(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUpdateTournamentDialog;
