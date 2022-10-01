import axios from "axios";
import { fetch_category, category_loading } from "./actionType";
// import { loadingSet } from "./events";

const baseUrl = "http://localhost:4000";

export const getCategory = function (payload) {
  return {
    type: fetch_category,
    payload,
  };
};

export const setLoading = function (payload) {
  return {
    type: category_loading,
    payload
  }
}

export const fetchCategory = function () {
  return (dispatch) => {
    // dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/categories`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(({ data }) => {
        dispatch(getCategory(data));
      })
      .finally(() => {
        dispatch(setLoading(false))
      })

    // .finally(() => dispatch(loadingSet(false)));
  };
};
