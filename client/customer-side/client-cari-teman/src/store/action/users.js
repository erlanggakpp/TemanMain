import axios from "axios";
import { logged_user } from "./actionType";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";

export const loginUser = function (userData) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios(`${baseUrl}/users/public/login`, {
      method: "POST",
      data: userData,
    }).then((data) => {
      // console.log(data, 'hasilLogin');
      localStorage.setItem("access_token", data.data.access_token);
    });
  };
};
export const fetchAllUsers = function () {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios(`${baseUrl}/users`, {
      method: "GET",
    }).then((data) => {
      return data;
    });
  };
};
export const fetchMyProfile = function () {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/users/my-profile`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        console.log(data.data, " <<<<<<<<<<<<<<<<<<<<<<");
        dispatch({
          type: logged_user,
          payload: data.data,
        });
        return data;
      });
  };
};

export const editMyProfile = function (data) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios.put(`${baseUrl}/users/my-profil`, data, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
  };
};

export const addUser = function (userData) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios.post(`${baseUrl}/users`, userData, {
      headers: {
        access_token: localStorage.access_token,
      },
    });
  };
};
