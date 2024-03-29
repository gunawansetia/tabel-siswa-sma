import axios from "axios";

const Endpoint = "https://dummyjson.com/users";

export const fetchTable = () => {
  return (dispatch) => {
    dispatch(initDataStarted());

    axios
      .get(Endpoint)
      .then(function (res) {
        let result = res.data;
        dispatch(initData(result));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const addSiswa = (data) => ({
  type: "ADD_DATA",
  payload: {
    users: data,
  },
});

export const getId = (data) => ({
  type: "GET_ID",
  payload: {
    id: data,
  },
});

export const updateSiswa = (data) => ({
  type: "PUT_DATA",
  payload: {
    users: data,
  },
});

const initData = (rows) => ({
  type: "INIT_DATA",
  rows,
});

const initDataStarted = () => ({
  type: "INIT_DATA_STARTED",
});
