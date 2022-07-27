import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL TEAMS
const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE TEAMS
const createTeams = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams(teamObj.uid).then(resolve);
        });
    }).catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
// DELETE TEAMS
const deleteSingleTeam = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams(uid).then((authorArray) => resolve(authorArray));
    })
    .catch((error) => reject(error));
});
// UPDATE TEAMS
const updateTeams = (teamsObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamsObject.firebaseKey}.json`, teamsObject)
    .then(() => getTeams(teamsObject.uid).then(resolve))
    .catch(reject);
});

// GET A SINGLE TEAMS'S PLAYERS
const getTeamsPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="teamId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams,
  createTeams,
  getSingleTeam,
  deleteSingleTeam,
  updateTeams,
  getTeamsPlayers,
};
