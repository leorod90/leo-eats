import { SWITCH_THEME, FIRST_RUN } from "./appActions";

const initialState = {
  darkTheme: true,
  firstRun: true,
};

interface Action {
  type: string;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SWITCH_THEME:
      const newTheme = !state.darkTheme;
      return { ...state, darkTheme: newTheme };
    case FIRST_RUN:
      const newFirstRun = false;
      return { ...state, firstRun: newFirstRun };

    default:
      return state;
  }
};
