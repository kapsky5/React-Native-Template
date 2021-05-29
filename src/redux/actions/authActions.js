import {REDUX} from "../../constants/redux";

export const SetActivities = (data) => {
  return {
    type: REDUX.SET_ACTIVITIES,
    payload: data,
  }
}
