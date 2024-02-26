import { useContext, ChangeEventHandler, useState, useEffect, FC } from "react";
import { InputsContext } from "../../../context/inputs";
import { MealsContext } from "../../../context/meals";

import "./index.css";

interface Category {
  strCategory: string;
}

interface Area {
  strArea: string;
}

interface FiltersProps {
  setCurrentPage: (val: number) => void;
}

const FiltersInputs: FC<FiltersProps> = ({ setCurrentPage }) => {
  const { searchByCategories, searchByAreas } = useContext(MealsContext);
  const { categories, areas } = useContext(InputsContext);

  const [categorySelected, setCategorySelected] = useState<string>("");
  const [areaSelected, setAreaSelected] = useState<string>("");

  const handleCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCategorySelected(e.target.value);
  };

  const handleArea: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setAreaSelected(e.target.value);
  };

  useEffect(() => {
    searchByCategories(categorySelected);
    setCurrentPage(1);
  }, [categorySelected]);

  useEffect(() => {
    searchByAreas(areaSelected);
    setCurrentPage(1);
  }, [areaSelected]);

  return (
    <div className="inputsContainer">
      <div>Filters</div>
      <select onChange={handleCategory}>
        <option disabled selected>
          Categories
        </option>
        {categories.map((category: Category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
      <select onChange={handleArea}>
        <option disabled selected>
          Areas
        </option>
        {areas.map((area: Area) => (
          <option key={area.strArea} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltersInputs;
