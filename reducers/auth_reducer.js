
import {
  FACEBOOK_LOGIN_SUCCEESS,
  FACEBOOK_LOGIN_FAIL
} from '../actions/types';


export default function (state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCEESS:
      return { token: action.payload };
    
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    
    default:
      return state;
  }
}
