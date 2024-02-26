import { createContext } from "react";
import { Meal } from "../../../interfaces/meals";

interface ContextProps {
  meals: Meal[];
  loading: boolean;
  searchByName: (name: string) => void;
  searchByCategories: (category: string) => void;
  searchByAreas: (area: string) => void;
}

export const MealsContext = createContext({} as ContextProps);
