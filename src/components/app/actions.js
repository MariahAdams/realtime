import { ERROR_CLEAR, ERROR, USER_LOAD, getUser } from './reducers';
import { auth } from '../../services/firebase';
import { playersRef } from '../../services/firebaseRef';
//TODO: userGamesRef

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
  return (dispatch, getState) => {
    const user = getUser(getState());
    playersRef.child(user.uid).set(true);
  };
};