import {
  GET_MEALS_BY_NAME,
  GET_MEALS_BY_CATEGORY,
  GET_MEALS_BY_AREA,
  SET_LOADER,
  STOP_LOADER,
} from "../../constants";

import { Meal } from "../../../interfaces/meals";

interface MealsState {
  meals: Meal[];
  loading: boolean;
}

type MealsActiontype =
  | { type: typeof GET_MEALS_BY_NAME; payload: Meal }
  | { type: typeof GET_MEALS_BY_CATEGORY; payload: Meal[] }
  | { type: typeof GET_MEALS_BY_AREA; payload: Meal[] };

type MealsAction = MealsActiontype | { type: string; payload?: any };

export const MEALS_INITIAL_STATE: MealsState = {
  meals: [],
  loading: false,
};

export const mealsReducer = (
  state: MealsState = MEALS_INITIAL_STATE,
  action: MealsAction
): MealsState => {
  switch (action.type) {
    case GET_MEALS_BY_NAME:
      return { ...state, meals: action.payload.meals || [] };
    case GET_MEALS_BY_CATEGORY:
      return { ...state, meals: action.payload || [] };
    case GET_MEALS_BY_AREA:
      return { ...state, meals: action.payload || [] };
    case SET_LOADER:
      return { ...state, loading: true };
    case STOP_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};
