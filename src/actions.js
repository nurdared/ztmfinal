import { CHANGE_USER_INFO, CHANGE_INPUT_URL, SET_DETECTION_BOX } from './constants';

export const setUserInfo = (user) => ({
  type: CHANGE_USER_INFO,
  payload: user
})

export const setInputUrl = (input) => ({
  type: CHANGE_INPUT_URL,
  payload: input
})

export const setDetectionBox = (boxes) => ({
  type: SET_DETECTION_BOX,
  payload: boxes
})