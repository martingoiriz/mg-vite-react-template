import update from "immutability-helper";
import React from "react";

export const AppContext = React.createContext(null);

export const initialState = {
  districts: [],

  userData: {
    email: "",
    firebaseToken: "",
    lastName: "",
    name: "",
    userId: null,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return update(state, { userData: { $set: action.data } });
    case "RESET_USER_DATA":
      return update(state, { userData: { $set: initialState.userData } });
    default:
      return initialState;
  }
}
