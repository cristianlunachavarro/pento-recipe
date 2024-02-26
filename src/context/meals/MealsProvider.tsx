import { FC, ReactNode, useEffect, useReducer } from "react";

import {
  GET_MEALS_BY_NAME,
  GET_MEALS_BY_CATEGORY,
  GET_MEALS_BY_AREA,
  SET_LOADER,
  STOP_LOADER,
} from "../../constants";

import { Meal } from "../../../interfaces/meals";

import {MealsContext, mealsReducer, MEALS_INITIAL_STATE } from ".";

import instance from "../../axiosInstance";

interface EntriesState {
  children: ReactNode;
}

export const MealsProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(mealsReducer, MEALS_INITIAL_STATE);

  const searchByName = async (name: string) => {
    try {
      dispatch({ type: SET_LOADER });

      const { data } = await instance.get(`/search.php?s=${name}`);

      dispatch({ type: GET_MEALS_BY_NAME, payload: data });
      dispatch({ type: STOP_LOADER });
    } catch (error) {
      dispatch({ type: STOP_LOADER });
      console.error("Error fetching meals:", error);
    }
  };

  const searchByCategories = async (category: string) => {
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await instance.get(`/filter.php?c=${category}`);

      const mealsWithDetails = await Promise.all(
        data.meals.map((meal: Meal) => getMealDetails(meal.idMeal))
      );

      dispatch({ type: GET_MEALS_BY_CATEGORY, payload: mealsWithDetails });
      dispatch({ type: STOP_LOADER });
    } catch (error) {
      dispatch({ type: STOP_LOADER });
      console.error("Error fetching meals by category:", error);
    }
  };

  const searchByAreas = async (areas: string) => {
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await instance.get(`/filter.php?a=${areas}`);

      const mealsWithDetails = await Promise.all(
        data.meals.map((meal: Meal) => getMealDetails(meal.idMeal))
      );

      dispatch({ type: GET_MEALS_BY_AREA, payload: mealsWithDetails });
      dispatch({ type: STOP_LOADER });
    } catch (error) {
      dispatch({ type: STOP_LOADER });
      console.error("Error fetching meals by area:", error);
    }
  };

  const getMealDetails = async (idMeal: string) => {
    const { data } = await instance.get(`/lookup.php?i=${idMeal}`);
    return data.meals[0];
  };

  useEffect(() => {
    searchByCategories("Seafood");
  }, []);

  return (
    <MealsContext.Provider
      value={{
        ...state,
        searchByName,
        searchByCategories,
        searchByAreas,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};
