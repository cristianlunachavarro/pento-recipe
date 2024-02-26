import { createContext } from "react";

interface ContextProps {
  categories: [];
  areas: [];
  getCategoriesList: () => void;
  getAreasList: () => void;
}

export const InputsContext = createContext({} as ContextProps);
