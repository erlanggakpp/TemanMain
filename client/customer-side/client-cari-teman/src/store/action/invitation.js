import axios from "axios";
import { fetch_magnets, detail_magnet } from "./actionType";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:3001";

export const addInvitation = function (data) {
  return function (dispatch) {
    const { UserId, EventId, MagnetId, invitationDescription, status } = data;
    dispatch(loadingSet(true));
    return axios.post(`${baseUrl}/invitations`, {
      UserId,
      EventId,
      MagnetId,
      invitationDescription,
      status,
    });
  };
};
