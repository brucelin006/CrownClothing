import { AnyAction } from "redux";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signOutSuccess,
  signUpFailed,
  signInFailed,
  signOutFailed,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state, //always spread the previous state values
      currentUser: action.payload,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null, //otherwise will stay in the reducer even after sign out from firebase
    };
  }

  if (
    signUpFailed.match(action) ||
    signInFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;

  // switch (action.type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state, //always spread the previous state values
  //       currentUser: payload,
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null, //otherwise will stay in the reducer even after sign out from firebase
  //     };
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //     };

  //   default:
  //     return state;
  // }
};
