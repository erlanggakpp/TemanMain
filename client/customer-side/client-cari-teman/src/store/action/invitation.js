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
          access_token: localStorage.access_token,
        },
      }
    );
  };
};
export const getMyInvitation = function (data) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/invitations/your-invitations`, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then((data) => {
        return data;
      });
  };
};

export const acceptInvitationFromStore = function (id) {
  // console.log(id, "<<<<<<<<<");
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .put(
        `${baseUrl}/invitations/${id}/accept`,
        {},
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        return data;
      });
  };
};
export const sendInvitation = function (eventId, id) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .put(
        `${baseUrl}/invitations/event/${eventId}/magnet/${id}/accept`,
        {},
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        return data;
      });
  };
};
