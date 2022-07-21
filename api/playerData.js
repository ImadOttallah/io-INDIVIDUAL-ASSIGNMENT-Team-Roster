import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL PLAYERS
const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// FIXME: CREATE PLAYER
const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, payload)
        .then(() => {
          getPlayers(playerObj.uid).then(resolve);
        });
    }).catch(reject);
});

// FIXME: DELETE PLAYER
const deleteSinglePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getPlayers(uid).then((authorArray) => resolve(authorArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE PLAYER
const updatePlayers = (playerObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObject.firebaseKey}.json`, playerObject)
    .then(() => getPlayers(playerObject.uid).then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  deleteSinglePlayer,
  updatePlayers,
  createPlayer,
};
