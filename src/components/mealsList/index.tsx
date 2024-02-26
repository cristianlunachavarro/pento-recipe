import { FC } from "react";
import { Meal } from "../../../interfaces/meals";

import "./index.css";

interface MealsListTypes {
  meals: Meal[];
}

const MealsList: FC<MealsListTypes> = ({ meals }) => {
  return (
    <div>
      <div className="heads">
        <div>ID</div>
        <div>Name</div>
        <div>Area</div>
        <div>Category</div>
      </div>
      {meals.map((meal) => (
        <div className="list" key={meal.idMeal}>
          <div>{`#${meal.idMeal}`}</div>
          <div className="img">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div>{meal.strMeal}</div>
          </div>
          <div>{meal.strArea}</div>
          <div>{meal.strCategory}</div>
        </div>
      ))}
    </div>
  );
};

export default MealsList;
