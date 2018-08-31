import { ERROR_CLEAR, ERROR, USER_LOAD, getUser, GAMES_LOAD } from './reducers';
import { auth } from '../../services/firebase';
import { playersRef, userGamesRef } from '../../services/firebaseRef';

export const clearError = () => ({ type: ERROR_CLEAR });

export const login = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log('User logged in!', user);
        dispatch({
          type: USER_LOAD,
          payload: user
        });

        userGamesRef.child(user.uid).on('value', snapshot => {
          dispatch({
            type: GAMES_LOAD,
            payload: Object.keys(snapshot.val())
          });
        });

      } else {
        console.log('No user');
        auth.signInAnonymously()
          .catch(err => {
            dispatch({
              type: ERROR,
              payload: err.message
            });
          });
      }
    });
  };
};


export const requestGame = () => {
  console.log('Play game!!!');
  return (dispatch, getState) => {
    const user = getUser(getState());
    playersRef.child(user.uid).set(true)
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.message
        });
      });
  };
};