import axios from "axios";
import { fetch_magnets } from "./actionType";
import { loadingSet } from "./events";

const baseUrl = "http://localhost:4000";

export const getCategory = function (payload) {
  return {
    type: fetch_magnets,
    payload,
  };
};

export const fetchCategory = function () {
  return (dispatch) => {
    dispatch(loadingSet(true));
    return axios
      .get(`${baseUrl}/categories`, {
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODgxMzM2fQ.wc8_YJIkTX-PhQSVGuU-ObrJA_53AvTixj08NAR2QPg",
        },
      })
      .then(({ data }) => {
        dispatch(getCategory(data));
      });

    // .finally(() => dispatch(loadingSet(false)));
  };
};
