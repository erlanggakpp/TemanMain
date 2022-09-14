import axios from "axios";
import { fetch_magnets, detail_magnet } from "./actionType";
import { fetchEvent, loadingSet } from "./events";
const Swal = require("sweetalert2");

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
      return data;
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
          access_token: localStorage.access_token,
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
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(({ data }) => {
        dispatch(getDetailMagnet(data));
        return data;
      });
    // .finally(() => dispatch(loadingSet(false)));
  };
};

export const fetchMagnetsByUserId = function () {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/magnets/user`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        return data;
      });
  };
};

export const deleteMagnetFromStore = function (id) {
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .delete(`${baseUrl}/magnets/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        return data;
      });
  };
};

export const editMagnet = function (data) {
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
    } = data;
    dispatch(loadingSet(true));
    return axios
      .put(
        `${baseUrl}/magnets/${data.id}`,
        {
          UserId,
          EventId,
          confirmationDate,
          ageRequirement,
          specialRequirement,
          magnetDescription,
          participant,
          vacantParticipant,
        },
        {
          headers: {
            access_token: localStorage.access_token,
          },
        }
      )
      .then((data) => {
        return data;
      });
  };
};
