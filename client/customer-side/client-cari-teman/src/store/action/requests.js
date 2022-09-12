import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";

export const addRequest = function (data) {
  return function (dispatch) {
    const {  EventId, MagnetId, requestDescription} = data;
    dispatch(loadingSet(true));
    return axios.post(
      `${baseUrl}/requests/event/${EventId}/magnet/${MagnetId}`,
      {
        requestDescription,
      },
      {
        headers: {
          access_token:
          localStorage.access_token    
        },
      }
    );
  };
};
