import {REDUX} from "../../constants/redux";

const initialState = {
  activities: [],
  index: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.SET_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload
      };
    }
    case REDUX.SET_INDEX: {
      return {
        ...state,
        index: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};

