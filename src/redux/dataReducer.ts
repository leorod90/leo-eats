import { FETCH_DATA, SET_DATA, TOGGLE_FAVORITE } from "./dataActions";

const initialState = {
  data: [],
  favorites: [],
};

interface Action {
  type: string;
  data: [];
  favorites: [];
  key: string;
}

function dataReducer(state = initialState, action: Action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.data,
      };
    case TOGGLE_FAVORITE:
      const existingIndex = state.favorites.findIndex(
        (item: any) => item.key === action.key
      );

      if (existingIndex >= 0) {
        const newFavorites = [...state.favorites];
        newFavorites.splice(existingIndex, 1);
        return {
          ...state,
          favorites: newFavorites,
        };
      } else {
        const recipe = state.data.find((item) => item.key === action.key);
        return {
          ...state,
          favorites: state.favorites.concat(recipe),
        };
      }

    default:
      return state;
  }
}

export default dataReducer;
