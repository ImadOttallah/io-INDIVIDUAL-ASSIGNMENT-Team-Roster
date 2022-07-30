import { deletePlayer, getSinglePlayer } from './playerData';
import { deleteSingleTeam, getSingleTeam, getSingleTeamPlayers } from './teamData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObj) => {
      getSingleTeam(playerObj.teamId)
        .then((teamObj) => {
          resolve({ teamObj, ...playerObj });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = ((teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getSingleTeamPlayers(teamFirebaseKey)])
    .then(([teamObj, playerTeamArray]) => {
      resolve({ ...teamObj, teams: playerTeamArray });
    }).catch((error) => reject(error));
}));

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getSingleTeamPlayers(teamId).then((playersArray) => {
    const deletePlayersPromises = playersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewPlayerDetails,
  viewTeamDetails,
  deleteTeamPlayers,
};
