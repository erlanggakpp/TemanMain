import axios from "axios";
import { fetch_magnets } from "./actionType";
import { loadingSet } from "./events";

const baseUrl = "http://localhost:3001";

export const getCategory = function (payload) {
  return {
    type: fetch_magnets,
    payload,
  };
};

export const fetchCategory = function () {
  return (dispatch) => {
    dispatch(loadingSet(true));
    return axios.get(`${baseUrl}/categories`).then(({ data }) => {
      dispatch(getCategory(data));
    });

    // .finally(() => dispatch(loadingSet(false)));
  };
};
