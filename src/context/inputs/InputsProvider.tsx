import { FC, ReactNode, useEffect, useReducer } from "react";

import instance from "../../axiosInstance";

import { inputsReducer, InputsContext, INPUTS_INITIAL_STATE } from ".";

import { GET_AREAS_LIST, GET_CATEGORIES_LIST } from "../../constants";

interface EntriesState {
  children: ReactNode;
}
export const InputsProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(inputsReducer, INPUTS_INITIAL_STATE);

  const getCategoriesList = async () => {
    try {
      const { data } = await instance.get("/list.php?c=list");
      dispatch({ type: GET_CATEGORIES_LIST, payload: data.meals });
    } catch (error) {
      console.log("Error fetching categories list", error);
    }
  };

  const getAreasList = async () => {
    try {
      const { data } = await instance.get("/list.php?a=list");
      dispatch({ type: GET_AREAS_LIST, payload: data.meals });
    } catch (error) {
      console.log("Error fetching areas list", error);
    }
  };

  useEffect(() => {
    getCategoriesList();
    getAreasList();
  }, []);

  return (
    <InputsContext.Provider
      value={{ ...state, getCategoriesList, getAreasList }}
    >
      {children}
    </InputsContext.Provider>
  );
};
