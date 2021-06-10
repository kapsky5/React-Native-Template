import {REDUX} from "../../constants/redux";

export const SetActivities = (data) => {
  return {
    type: REDUX.SET_ACTIVITIES,
    payload: data,
  }
}

export const setIndex = (index) => {
  return {
    type: REDUX.SET_INDEX,
    payload: index,
  }
}
