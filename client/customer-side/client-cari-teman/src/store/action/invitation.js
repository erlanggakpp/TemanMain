import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";

export const addInvitation = function (data) {
  return function (dispatch) {
    const { UserId, EventId, MagnetId, invitationDescription, status } = data;
    dispatch(loadingSet(true));
    return axios.post(
      `${baseUrl}/invitations`,
      {
        UserId,
        EventId,
        MagnetId,
        invitationDescription,
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
export const getMyInvitation = function (data) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios.get(
      `${baseUrl}/invitations/your-invitations`,
      {
        headers: {
          access_token:
            localStorage.access_token
        },
      }
    ).then( (data) => {
      return data
            });
  };
}