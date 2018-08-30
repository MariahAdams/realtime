import { ERROR_CLEAR, ERROR } from './reducers';
import { auth } from '../../services/firebase';
//TODO: playersRef, userGamesRef

export const clearError = () => ({ type: ERROR_CLEAR });

export const login = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if(user) {
        
        dispatch({
          type: USER_LOAD,
          payload: 
        });

      } else {
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