import axios from "axios"
import { fetch_event } from "./actionType";


export const getEvent = function (payload) {
    return {
      type: fetch_event,
      payload,
    };
  };


  export const fetchEvent = function () {
      console.log('masukk');
    return (dispatch) => {
    //   dispatch(loadingSet(true));
      return axios.get('http://localhost:3001/events')
        .then((data) => {
        console.log(data);
        console.log('masuuk');
          dispatch(getEvent(data));
        })
  
        // .finally(() => dispatch(loadingSet(false)));
    };
  };
