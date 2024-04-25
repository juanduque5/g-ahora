import SearchBox from "./searchBox";
import NumberGuests from "./numberGuests";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import down from "../../images/chevron-down.png";
import dayjs from "dayjs";
import language from "./language";
import { useSelector } from "react-redux"; // Importa las funciones useSelector y useDispatch

function Search() {
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const navigate = useNavigate();
  const [filteredWords, setFilteredInformation] = useState([]);
  const [isGuests, setIsGuests] = useState(false);
  const today = dayjs();
  const [checkInDate, setCheckInDate] = useState(null);
  const [location, setLocation] = useState("");
  const [checkOutDate, setCheckOutDate] = useState(null);
  const guests = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { message2, message3, message4, message5, message6 } =
    language[storedLanguage];
  const [filterOption, setFilterOption] = useState({
    place: {
      location: "",
    },
    checkInDate: "",
    checkOutDate: "",
    checkin: "",
    checkout: "",
    guests: "",
  });

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setFilterOption({
      ...filterOption,
      checkInDate: date.format("YYYY-MM-DD"),
      checkin: date,
    });
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    setFilterOption({
      ...filterOption,
      checkOutDate: date.format("YYYY-MM-DD"),
      checkout: date,
    });
  };

  const handleSelectedFilter = (option, key) => {
    if (option === "guests") {
      setFilterOption({
        ...filterOption,
        guests: key,
      });
    }
  };

  /////
  const locationInfo = (e) => {
    console.log(e.target.value);

    const textValue = e.target.value;
    setLocation(textValue);
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          "http://localhost:2001/properties/autocomplete/guatemala/?searchTerm=" +
            location,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFilteredInformation(data.places);
        console.log("cities and all", data.places);
      } catch (error) {
        console.log("ERROR: autocomplete cities ", error);
      }
    };
    dataFetch();
  }, [location]);

  useEffect(() => {
    setFilterOption((prevFilterOption) => ({
      ...prevFilterOption,
      place: {
        ...prevFilterOption.place,
        location: location.length > 3 ? location : "",
      },
    }));
  }, [location]);

  const placeInformation = (place) => {
    setLocation(place);
    console.log(place);
    setFilteredInformation([]);
  };

  const guestsOpen = () => {
    setIsGuests(!isGuests);
    // console.log("adentro", isOptionOpen);
  };
  //Scroll down
  const searchProperties = () => {
    navigate("/Vacations", { state: { filterOption } });
  };
  return (
    <div className="ajusta ">
      <div className="m-auto mb-0  mt-10  h-auto md:h-20 md:w-full  lg:block lg:w-11/12 xl:w-full">
        <div className="m-auto flex h-auto w-full flex-col gap-5 rounded-lg shadow-lg  md:h-18 md:flex-row md:gap-0 md:bg-white ">
          <div className="flex w-full cursor-pointer flex-col   md:w-2/5 md:flex-row">
            <div className="  h-full w-full border-r">
              <div className="flex h-full w-full items-center md:m-auto ">
                <input
                  onChange={locationInfo}
                  className="text-md m-auto h-11 w-full truncate rounded-sm border border-black-new  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 md:w-95 md:p-0"
                  type="text"
                  placeholder={message2}
                  value={location}
                ></input>
              </div>
              <div
                className={`absolute z-20 m-auto mt-1 max-h-48 w-82 cursor-pointer overflow-y-auto bg-white shadow-xl  md:relative md:w-95 ${
                  filteredWords.length ? "block" : "hidden"
                }`}
              >
                <SearchBox
                  placeInformation={placeInformation}
                  filteredWords={filteredWords}
                />
              </div>
            </div>
          </div>
          <div className="flex h-auto w-full gap-2 bg-white md:w-1/2">
            <div className=" m-auto flex h-full w-full  cursor-pointer truncate  bg-white ">
              <DatePicker
                label={message4}
                value={checkInDate < checkOutDate ? checkInDate : checkInDate}
                onChange={handleCheckInDateChange}
                minDate={today}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  margin: "auto",
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid black",
                  },
                  background: "white", // Setting background color to white
                }}
              />
            </div>
            <div className=" flex h-full w-full cursor-pointer truncate border-r bg-white">
              <DatePicker
                label={message5}
                disabled={checkInDate ? false : true}
                value={checkOutDate > checkInDate ? checkOutDate : null}
                onChange={handleCheckOutDateChange}
                minDate={checkInDate ? checkInDate : today}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  margin: "auto",
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid black",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex w-full cursor-pointer flex-col gap-5 md:w-2/5 md:flex-row md:gap-0 ">
            <div className="relative  inline-block h-11 w-full cursor-pointer bg-white md:h-full md:w-55">
              <div onClick={guestsOpen} className="m-auto flex h-full w-90 ">
                <div className="m-auto  w-90">
                  <p className="m-auto truncate font-open-sans text-base font-bold lg:text-sm xl:text-base">
                    {filterOption.guests
                      ? `${message3} ${filterOption.guests}`
                      : message3}
                  </p>
                </div>

                <div className="m-auto">
                  <img className="m-auto" src={down} alt="Hi"></img>
                </div>
              </div>
              <div
                className={`absolute z-10 mt-1 h-auto w-full bg-white md:relative ${
                  isGuests ? "block" : "hidden"
                }`}
              >
                <NumberGuests
                  opciones={guests}
                  handleSelectedFilter={handleSelectedFilter}
                />
              </div>
            </div>
            <div
              onClick={searchProperties}
              className=" flex h-9 w-full cursor-pointer truncate rounded-xl bg-blue-new shadow-lg md:m-auto md:h-4/5 md:w-2/5"
            >
              <p className="m-auto truncate text-center font-fira-sans text-sm  font-semibold text-white md:text-sm lg:text-base xl:text-xl">
                {message6}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
