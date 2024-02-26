import { GET_CATEGORIES_LIST, GET_AREAS_LIST } from "../../constants";

interface InputsState {
  categories: [];
  areas: [];
}

type InputsActiontype =
  | { type: typeof GET_CATEGORIES_LIST; payload: [] }
  | { type: typeof GET_AREAS_LIST; payload: [] };

export const INPUTS_INITIAL_STATE: InputsState = {
  categories: [],
  areas: [],
};

export const inputsReducer = (
  state: InputsState = INPUTS_INITIAL_STATE,
  action: InputsActiontype //revidsar esto
) => {
  switch (action.type) {
    case GET_CATEGORIES_LIST:
      return { ...state, categories: action.payload };
    case GET_AREAS_LIST:
      return { ...state, areas: action.payload };
    default:
      return { ...state };
  }
};
