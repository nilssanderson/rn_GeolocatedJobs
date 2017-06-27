
import _ from 'lodash';
import {
  LIKE_JOB
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case LIKE_JOB:
      // if there are any duplicate jobs, dont add it to our list
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');

    default:
      return state;
  }
}
