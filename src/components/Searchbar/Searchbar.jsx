import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./Searchbar.css";

const Searchbar = ({onSearch}) => {
  const [query, setQuery] = useState("");


  const handleInputChange = (e) => { 
    setQuery(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      onSearch(query);
    }
  }
 
  const handleIconClick = () => {
    if(query) {
      onSearch(query);
    }

  }

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <CiSearch id="search" size={25} style={{ fill: "white" }} onClick={handleIconClick}/>
    </div>
  );
};

export default Searchbar;
