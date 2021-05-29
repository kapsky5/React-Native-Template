import {REDUX} from "../../constants/redux";

const initialState = {
  activities: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.SET_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};

