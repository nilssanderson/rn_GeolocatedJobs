
import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];

    case CLEAR_LIKED_JOBS:
      return [];

    case LIKE_JOB:
      // if there are any duplicate jobs, dont add it to our list
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');

    default:
      return state;
  }
}
