import axios from "axios";
import { fetch_detail, fetch_event, loading_set } from "./actionType";

const baseUrl = "http://localhost:3001";

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
    dispatch(loadingSet(true));
    return axios.get(`${baseUrl}/events`).then(({ data }) => {
      dispatch(getEvent(data));
    });

    // .finally(() => dispatch(loadingSet(false)));
  };
};

export const detailEvent = function (id) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios.get(`${baseUrl}/events/${id}`).then(({ data }) => {
      dispatch(getDetail(data));
    });
    // .finally(() => dispatch(loadingSet(false)));
  };
};
