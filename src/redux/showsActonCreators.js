import axios from "axios";
import * as actionTypes from "./showsActionTypes";

const apiUrl = "http://api.tvmaze.com";

let wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const searchItems = (value) => {
  return async (dispatch) => {
    try {
      if (value) {
        dispatch({ type: actionTypes.LOADING });
        const response = await axios.get(`${apiUrl}/search/shows?q=${value}`);
        dispatch({
          type: actionTypes.GET_SHOWS_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const handleCollapse = (data) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    await wait(1000);
    dispatch({
      type: actionTypes.COLLAPSE,
      payload: data,
    });
  };
};

export const starItems = (name) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING });

    await wait(1000);
    dispatch({
      type: actionTypes.STAR_CHANGER,
      payload: name,
    });
  };
};
