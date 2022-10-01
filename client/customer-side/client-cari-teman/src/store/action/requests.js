import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";

export const addRequest = function (data) {
  return function (dispatch) {
    const { EventId, MagnetId, requestDescription } = data;
    dispatch(loadingSet(true));
    return axios.post(
      `${baseUrl}/requests/event/${EventId}/magnet/${MagnetId}`,
      {
        requestDescription,
      },
      {
        headers: {
          access_token: localStorage.access_token,
        },
      }
    );
  };
};

export const getMyRequest = function () {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/requests/your-requests`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((data) => {
        return data;
      });
  };
};
export const acceptRequestFromStore = function (id) {
  // console.log(id, "<<<<<<<<<");
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .put(
        `${baseUrl}/requests/${id}/accept`,
        {},
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
};
export const rejectRequestFromStore = function (id) {
  // console.log(id, "<<<<<<<<<");
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .put(
        `${baseUrl}/requests/${id}/reject`,
        {},
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };
};
