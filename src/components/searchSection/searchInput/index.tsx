import { useContext, useState } from "react";

import { MealsContext } from "../../../context/meals";
import searchIcon from "../../../assets/images/search-icon.png";

import "./index.css";

const SearchInput = () => {
  const { searchByName } = useContext(MealsContext);

  const [name, setName] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = () => {
    if (name.length < 1) return;
    searchByName(name);
    setName("");
  };

  return (
    <div className="searchContainer">
      <input
        value={name}
        type="search"
        onChange={handleSearch}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <img
        className="searchIcon"
        src={searchIcon}
        alt="searchIcon"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SearchInput;
