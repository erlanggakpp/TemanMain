import axios from "axios";
import { fetch_detail, fetch_event, loading_set } from "./actionType";

const baseUrl = "http://localhost:4000";

export const getEvent = function (payload) {
  return {
    type: fetch_event,
    payload,
  };
};

export const getDetail = function (payload) {
  return {
    type: fetch_detail,
    payload,
  };
};

export const loadingSet = function (payload) {
  return {
    type: loading_set,
    payload,
  };
};

export const fetchEvent = function () {
  return (dispatch) => {
    // dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/events`, {
        headers: {
          access_token:
            localStorage.access_token        
          },
      })
      .then(({ data }) => {
        dispatch(getEvent(data));
        // return data
      })
      .finally(() => {
        dispatch(loadingSet(false))
      })

    // .finally(() => dispatch(loadingSet(false)));
  };
};

export const detailEvent = function (id) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/events/${id}`, {
        headers: {
          access_token:
            localStorage.access_token
        },
      })
      .then(({ data }) => {
        dispatch(getDetail(data));
      })
      .finally(() => {
        dispatch(loadingSet(false))
      })
    // .finally(() => dispatch(loadingSet(false)));
  };
};

export const getLocation = (loc) => (dispatch) =>{
  return axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc},ID/2023-07-04?key=VQKDY363J7W3FXYM3KFRER4RW`
  )
}
