import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../actions';

const url = '/api/players';

const REQUEST = 'yasp/player/REQUEST';
const OK = 'yasp/player/OK';
const ERROR = 'yasp/player/ERROR';

export const playerActions = {
  REQUEST,
  OK,
  ERROR
};

const getPlayerRequest = () => ({ type: REQUEST });

const getPlayerOk = (payload) => ({
  type: OK,
  payload
})

const getPlayerError = (payload) => ({
  type: ERROR,
  payload
});

export const getPlayer = (playerId, host=HOST_URL) => {
  return (dispatch) => {
    return fetch(`${host}${url}/${playerId}`)
      .then(response => response.json())
      .then(json => dispatch(getPlayerOk(json)))
      .catch(error => dispatch(getPlayerError()));
  };
};
