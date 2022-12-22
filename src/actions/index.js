import axios from "axios";

const Endpoint = "https://dummyjson.com/users";

export const fetchTable = () => {
  return (dispatch) => {
    dispatch(initDataStarted());

    axios
      .get(Endpoint)
      .then(function (res) {
        console.log(res);
        let result = res.data;
        dispatch(initData(result));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

const initData = (rows) => ({
  type: "INIT_DATA",
  rows,
});

const initDataStarted = () => ({
  type: "INIT_DATA_STARTED",
});
