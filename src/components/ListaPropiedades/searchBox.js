import React from "react";

const SearchBox = ({ filteredWords, placeInformation }) => {
  return (
    <div className=" m-auto flex w-95 flex-col md:w-full ">
      {filteredWords.map((place, index) => (
        <div key={index} className="border-b">
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
