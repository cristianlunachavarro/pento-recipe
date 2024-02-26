import React, { useContext, useState } from "react";
import SearchInput from "../searchSection/searchInput";
import FilterInputs from "../searchSection/filterInputs";
import Pagination from "../pagination";
import MealsList from "../mealsList";

import { MealsContext } from "../../context/meals";

import "./index.css";
import Loader from "../loader";

interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ title = "Pento Recipe App" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { meals, loading } = useContext(MealsContext);

  const { paginatedMeals, numberPages } = paginateResults(meals, currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="layout">
      <div className="title">{title}</div>
      <SearchInput />
      <FilterInputs setCurrentPage={setCurrentPage} />
      <MealsList meals={paginatedMeals} />
      <Pagination
        currentPage={currentPage}
        totalPages={numberPages}
        onPageChange={handlePageChange}
      />
      {loading && <Loader />}
    </div>
  );
};

export default Layout;

const paginateResults = (results: any[], page: number) => {
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const numberPages = Math.ceil(results.length / pageSize);
  const paginatedMeals = results.slice(startIndex, endIndex);

  return { paginatedMeals, numberPages };
};
