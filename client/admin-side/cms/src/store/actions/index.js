import {
  USER_FETCH,
  EVENT_FETCH,
  CATEGORY_FETCH,
  CATEGORY_DETAILID,
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
    return axios.get('http://localhost:4000/events', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
      dispatch(fetchevent(data));
    });
  };
};

export const deleteEvents = (id) => {
  return (dispatch) => {
    console.log(id, 'from action');
    return axios
      .delete(`http://localhost:4000/events/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:4000/categories/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};

export const postEvent = (input) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:4000/events', input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
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
    return axios.get(`http://localhost:4000/events/${id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
      dispatch(detailEvent(data));
    });
  };
};

export const updateEvent = (id, input) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:4000/events/${id}`, input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
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
    return axios.get('http://localhost:4000/users', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
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
    return axios.get('http://localhost:4000/categories', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
      dispatch(fetchcategory(data));
    })
  };
};

export const postCategory = (input) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:4000/categories', input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};
export const detailCategory = (payload) => {
  return {
    type: CATEGORY_DETAILID,
    payload,
  };
};

export const fetchCategoryById = (categoryId) => {
  return (dispatch) => {
    return axios.get(`http://localhost:4000/categories/${categoryId}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
      dispatch(detailCategory(data));
    });
  };
};

export const updateCategory = (id, input) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:4000/categories/${id}`, input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};

export const postUser = (input) => {
  return (dispatch) => {
    return axios
      .post('http://localhost:4000/users', input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:4000/users/${id}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .then((data) => {
    //   dispatch(fetchUsers(data));
    // });
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
    return axios.get(`http://localhost:4000/users/${id}`, {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((data) => {
      dispatch(detailuser(data));
    });
  };
};

export const updateUser = (id, input) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:4000/users/${id}`, input, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
  };
};

export const login = (value) => {
  return axios
    .post(`http://localhost:4000/users/login`, value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};
