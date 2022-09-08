import axios from "axios";
import { fetch_magnets } from "./actionType";
import { loadingSet } from "./events";

const baseUrl = "http://localhost:3001";

export const getMagnets = function (payload) {
  return {
    type: fetch_magnets,
    payload,
  };
};

export const fetchMagnet = function () {
  return (dispatch) => {
    dispatch(loadingSet(true));
    return axios.get(`${baseUrl}/magnets`).then(({ data }) => {
      dispatch(getMagnets(data));
    });

    // .finally(() => dispatch(loadingSet(false)));
  };
};

export const addMagnets = function (data) {
  return function (dispatch) {
    const {
      UserId,
      EventId,
      confirmationDate,
      status,
      ageRequirement,
      specialRequirement,
      magnetDescription,
      participant,
      vacantParticipant,
      participantDescription,
    } = data;
    dispatch(loadingSet(true));
    return axios.post(`${baseUrl}/magnets`, {
      UserId,
      EventId,
      confirmationDate,
      status,
      ageRequirement,
      specialRequirement,
      magnetDescription,
      participant,
      vacantParticipant,
      participantDescription,
    });
  };
};