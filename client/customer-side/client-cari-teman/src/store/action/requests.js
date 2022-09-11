import axios from "axios";
import { loadingSet } from "./events";
const baseUrl = "http://localhost:4000";

export const addRequest = function (data) {
  return function (dispatch) {
    const { UserId, EventId, MagnetId, requestDescription, status } = data;
    dispatch(loadingSet(true));
    return axios.post(
      `${baseUrl}/requests`,
      {
        UserId,
        EventId,
        MagnetId,
        requestDescription,
        status,
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
