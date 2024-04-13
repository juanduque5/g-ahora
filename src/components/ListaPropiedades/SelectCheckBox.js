import React from "react";

function SelectCheckbox({
  opciones,
  // handleSelectedChange2,
  handleSelectedFilter,
  handleSearchData,
}) {
  // console.log("searchData awlwct", handleSearchData.uso);
  return (
    <div className="m-auto w-full  rounded-lg shadow-md">
      {opciones.map((option) => (
        <label key={option} className="flex  w-full flex-row gap-3  border-b">
          <input
            className=" w-5 "
            type="checkbox"
            checked={handleSearchData.uso[option]}
            onChange={() => {
              handleSelectedFilter(option);
              // handleSelectedChange2(option);
              // localStorage.setItem("searchData", handleSearchData.uso[option]);
            }}
          />
          <p className="flex w-full select-none items-center ">{option}</p>
        </label>
      ))}
    </div>
  );
}

export default SelectCheckbox;
