
import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';

import {
  FACEBOOK_APP_ID
} from '../configs';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';


// how to use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

// if single arguement can remove parans (dispatch)
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // start up FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permissions: ['public_profile']
  });

  // something went wrong, e.g. user cancelled or wrong password attempts
  if (type === 'cancel') {
    console.log(FACEBOOK_LOGIN_FAIL);
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  // save token we got back
  await AsyncStorage.setItem('fb_token', token);
  console.log(FACEBOOK_LOGIN_SUCCESS);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
