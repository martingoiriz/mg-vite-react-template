import { CONTEXT_ACTIONS } from "constants";
import update from "immutability-helper";
import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const initialState = {
  userData: {
    email: "",
    name: "",
    userId: null,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case CONTEXT_ACTIONS.CLEAR_USER_DATA:
      return update(state, { userData: { $set: initialState.userData } });
    case CONTEXT_ACTIONS.SET_USER_DATA:
      return update(state, { userData: { $set: action.data } });
    default:
      return initialState;
  }
}
