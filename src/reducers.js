import { CHANGE_USER_INFO, CHANGE_INPUT_URL, SET_DETECTION_BOX } from "./constants";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  },
  input: "",
  boxes: []
}

export const setBaseState = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return { ...state, user: action.payload }
    case CHANGE_INPUT_URL:
      return { ...state, input: action.payload }
    case SET_DETECTION_BOX:
      return { ...state, boxes: action.payload }
    default:
      return state;
  }
}
