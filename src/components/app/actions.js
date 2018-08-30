import { ERROR_CLEAR, ERROR, USER_LOAD } from './reducers';
import { auth } from '../../services/firebase';
//TODO: playersRef, userGamesRef

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