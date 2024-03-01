import React from "react";

const SearchBox = ({ filteredWords }) => {
  return (
    <div className="flex flex-col ">
      {filteredWords.map((information, index) => (
        <div key={index} className="hover: border">
          <p>{information}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchBox;
