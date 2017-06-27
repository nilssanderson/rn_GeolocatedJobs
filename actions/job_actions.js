
import qs from 'qs';
import reverseGeocode from 'latlng-to-zip';
import {
  FETCH_JOBS,
  LIKE_JOB
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '5576787368219379',
  format: 'json',
  v: '2',
  latlong: 1, // return latitude and longitude for each job
  radius: 10, // in miles
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  // take a copy of all of the properties in JOB_QUERY_PARAMS and append the zip to l
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    const zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch({ type: FETCH_JOBS, payload: responseJson });
    callback();
  } catch (e) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};
