import axios from "axios";
import { fetch_magnets, detail_magnet } from "./actionType";
import { fetchEvent, loadingSet } from "./events";

const baseUrl = "http://localhost:4000";

export const getMagnets = function (payload) {
  return {
    type: fetch_magnets,
    payload,
  };
};

export const getDetailMagnet = function (payload) {
  return {
    type: detail_magnet,
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
      ageRequirement,
      specialRequirement,
      magnetDescription,
      participant,
      vacantParticipant,
      participantDescription,
    } = data;
    dispatch(loadingSet(true));
    return axios.post(
      `${baseUrl}/magnets`,
      {
        UserId,
        EventId,
        confirmationDate,
        ageRequirement,
        specialRequirement,
        magnetDescription,
        participant,
        vacantParticipant,
        participantDescription,
      },
      {
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODgxMzM2fQ.wc8_YJIkTX-PhQSVGuU-ObrJA_53AvTixj08NAR2QPg",
        },
      }
    );
  };
};

export const detailMagnet = function (id) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/magnets/${id}`, {
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODgxMzM2fQ.wc8_YJIkTX-PhQSVGuU-ObrJA_53AvTixj08NAR2QPg",
        },
      })
      .then(({ data }) => {
        dispatch(getDetailMagnet(data));
      });
    // .finally(() => dispatch(loadingSet(false)));
  };
};
