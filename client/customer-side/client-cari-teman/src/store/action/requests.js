import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:3001";

export const addRequest = function (data) {
  return function (dispatch) {
    const { UserId, EventId, MagnetId, requestDescription, status } = data;
    dispatch(loadingSet(true));
    return axios.post(`${baseUrl}/requests`, {
      UserId,
      EventId,
      MagnetId,
      requestDescription,
      status,
    });
  };
};
