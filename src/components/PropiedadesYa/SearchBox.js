import React from "react";

const SearchBox = ({ filteredWords, placeInformation }) => {
  return (
    <div className=" m-auto flex w-full flex-col ">
      {filteredWords.map((place, index) => (
        <div key={index} className="border">
          <div
            onClick={() => placeInformation(place)}
            className="hover:bg-slate-100 hover:text-blue-new"
          >
            <p>{place}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBox;
