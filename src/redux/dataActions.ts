export const FETCH_DATA = "FETCH_DATA";
export const SET_DATA = "SET_DATA";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

import { db } from "../../firebase/utils";

export const fetchData = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: FETCH_DATA,
      data,
    });
  };
};

export const setData = (products: any[]) => ({
  type: SET_DATA,
  products,
});

export const toggleFavorite = (key: string) => ({
  type: TOGGLE_FAVORITE,
  key,
});
