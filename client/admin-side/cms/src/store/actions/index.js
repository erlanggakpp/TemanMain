import {
  USER_FETCH,
  EVENT_FETCH,
  CATEGORY_FETCH,
  USER_DETAILID,
  EVENT_DETAILID,
} from './actionType';
import axios from 'axios';

export const fetchevent = (payload) => {
  return {
    type: EVENT_FETCH,
    payload,
  };
};

export const fetchEvents = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/events').then((data) => {
      dispatch(fetchevent(data));
    });
  };
};

export const deleteEvents = (id) => {
  return (dispatch) => {
    console.log(id, 'from action');
    return axios
      .delete(`http://localhost:3001/events/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then((data) => {
        dispatch(fetchEvents(data));
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    console.log(id, 'from action');
    return axios
      .delete(`http://localhost:3001/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then((data) => {
        dispatch(fetchCategories(data));
      });
  };
};

export const postEvent = (input) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3001/events', input, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
};

export const detailEvent = (payload) => {
  return {
    type: EVENT_DETAILID,
    payload,
  };
};

export const fetchEventById = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/events/${id}`).then((data) => {
      dispatch(detailEvent(data));
    });
  };
};

export const updateEvent = (id, input) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3001/events/${id}`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        dispatch(fetchEvents(data));
      });
  };
};

export const fetchuser = (payload) => {
  return {
    type: USER_FETCH,
    payload,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/users').then((data) => {
      dispatch(fetchuser(data));
    });
  };
};

export const fetchcategory = (payload) => {
  return {
    type: CATEGORY_FETCH,
    payload,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/categories').then((data) => {
      dispatch(fetchcategory(data));
    });
  };
};

export const postUser = (input) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:3001/users', input, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3001/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then((data) => {
        dispatch(fetchUsers(data));
      });
  };
};

export const detailuser = (payload) => {
  return {
    type: USER_DETAILID,
    payload,
  };
};

export const fetchuserbyid = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/users/${id}`).then((data) => {
      dispatch(detailuser(data));
    });
  };
};

export const updateUser = (id, input) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3001/users/${id}`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        dispatch(fetchUsers(data));
      });
  };
};
