import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";


export const loginUser = function (userData) {
    console.log(userData, 'inputUser');
    return function (dispatch) {
      dispatch(loadingSet(true));
      return axios(`${baseUrl}/users/public/login`, {
        method: "POST",
        data: userData,
      }).then( (data) => {
        console.log(data, 'hasilLogin');
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("gender", data.data.gender);
        localStorage.setItem("age", data.data.age);
      });
    };
  };