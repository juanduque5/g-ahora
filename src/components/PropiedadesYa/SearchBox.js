import React from "react";

const SearchBox = ({ filteredWords }) => {
  return (
    <div className=" m-auto flex w-full flex-col ">
      {filteredWords.map((information, index) => (
        <div key={index} className="border">
          <div className="hover:bg-slate-100 hover:text-blue-new">
            <p>{information}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBox;
