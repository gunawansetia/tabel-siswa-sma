let initialState = {
  rows: [],
  error: null,
  loading: false,
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_DATA":
      return {
        ...state,
        loading: false,
        rows: action.rows,
      };

    case "INIT_DATA_STARTED":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default items;
