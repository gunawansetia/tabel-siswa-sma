let initialState = {
  id: "",
  rows: [],
  error: null,
  loading: true,
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_DATA":
      return {
        ...state,
        loading: false,
        rows: action.rows.users,
      };

    case "INIT_DATA_STARTED":
      return {
        ...state,
        loading: true,
      };

    case "ADD_DATA":
      return {
        ...state,
        rows: [action.payload.users, ...state.rows],
      };

    case "PUT_DATA":
      return {
        ...state,
        rows: state.rows.map((item) =>
          item.id === action.payload.users.id
            ? { ...item, ...action.payload.users }
            : item
        ),
      };

    case "GET_ID":
      return {
        ...state,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

export default items;
