import axios from "axios";
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
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("gender", data.data.gender);
      localStorage.setItem("age", data.data.age);
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
        return data;
      });
  };
};

export const editMyProfile = function (data) {
  console.log(data, "masook");
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios.put(`${baseUrl}/users/my-profil`, data, {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
  };
};
