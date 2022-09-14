import axios from "axios";
import { fetch_magnets, detail_magnet, token_agora } from "./actionType";
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

export const postToken = function (payload) {
  return {
    type: token_agora,
    payload
  }
}

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
  console.log("MASUUUK");
  return function (dispatch) {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/magnets/user`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        console.log(data, "dari action");
        return data;
      });
  };
};

export const createToken = function (data) {
  return function (dispatch) {
    const { channel } = data
    console.log(channel, "DDDDDDDDDDDDDDDDDDDDDDDDDD");
    return axios({
      method: "POST",
      url: `${baseUrl}/rtctoken`,
      data: {
        isPublisher: 1,
        channel
      },
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(({ data }) => {
        console.log(data, "AAAAAAAAAAAAAAAAAAAA");
        dispatch(postToken(data));
        return data;
      });
    // .finally(() => dispatch(loadingSet(false)));
  };
};