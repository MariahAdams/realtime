import { ERROR_CLEAR/* , ERROR */ } from './reducers';
import { auth } from '../../services/firebase';
//TODO: playersRef, userGamesRef

export const clearError = () => ({ type: ERROR_CLEAR });

export const login = () => {
  auth.onAuthStateChanged(user => {
    if(user) {
      console.log('user logged in!');
    } else {
      console.log('Opps. Fail. Try again.');
    }
  });
};