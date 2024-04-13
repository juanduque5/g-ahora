import { React, useState, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
import "./Vacations.css";
import down from "../../images/chevron-down.png";
import SearchBox from "./searchBox";
import NumberGuests from "./numberGuests";
// import BasicDateRangePicker from "./BasicDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import language from "./language";

const Vacations = () => {
  const [location, setLocation] = useState("");
  const storedLanguage = useSelector((state) => state.language.language);
  const skeleton = useSelector((state) => state.language.skeleton);
  const {
    message0,
    message1,
    message2,
    message3,
    message4,
    message5,
    message6,
    message7,
  } = language[storedLanguage];
  const [filteredWords, setFilteredInformation] = useState([]);
  const [isGuests, setIsGuests] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const guests = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [filterOption, setFilterOption] = useState({
    place: {
      location: "",
    },
    guests: null,
  });

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleSelectedFilter = (option, key) => {
    if (option === "guests") {
      setFilterOption({
        ...filterOption,
        guests: key,
      });
    }
  };

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

  const searchProperties = () => {
    if (checkInDate && checkOutDate) {
      // Construye la URL con los parámetros de consulta
      const url = new URL("http://localhost:2001/vacations/searchProperty");
      url.searchParams.append("checkInDate", checkInDate);
      url.searchParams.append("checkOutDate", checkOutDate);
      url.searchParams.append("location", filterOption.place.location);
      url.searchParams.append("guests", filterOption.guests);

      // Realiza la solicitud GET
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error al enviar los datos al backend:", error);
        });
    } else {
      console.error("Ambas fechas deben ser seleccionadas");
    }
  };

  const today = dayjs(); // Obtener la fecha actual
  // const formattedToday = checkInDate.format("MM-DD-YYYY"); // Formatear la fecha como 'YYYY-MM-DD'

  // console.log(formattedToday);
  return (
    <div className="ajusta ">
      {skeleton ? (
        <div className="m-auto mb-16 mt-8 flex h-530 w-full animate-pulse rounded-3xl bg-gray-300 md:w-full lg:h-786 xl:h-786">
          <div className="m-auto flex h-5/6 w-11/12 flex-col bg-gray-300">
            <div className="flex h-2/5 w-full flex-col">
              <div className="my-auto flex w-full select-none">
                <p className="m-auto select-none font-fira-sans text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl"></p>
              </div>
            </div>
            <div className="h-1/5">
              <div className="mb-3 font-open-sans text-sm font-semibold not-italic text-white md:hidden"></div>
              <div className="hidden font-open-sans text-sm font-semibold not-italic text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="m-auto mb-16 mt-8 flex  h-530 w-full rounded-3xl md:w-full  lg:h-786  xl:h-786"
          id="image"
        >
          <div className="m-auto flex h-5/6 w-11/12 flex-col ">
            <div className="flex h-2/5 w-full flex-col ">
              <div className="my-auto flex   w-full">
                <p className="m-auto text-center font-fira-sans text-2xl font-extrabold not-italic text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-7xl">
                  {message0}
                </p>
              </div>
            </div>
            <div className="h-1/5 ">
              <p className="mb-3 text-center font-open-sans  text-sm font-semibold not-italic text-white md:hidden">
                {message1}
              </p>
              <p className="hidden text-center font-open-sans text-sm font-semibold not-italic  text-white sm:text-base md:block md:text-base lg:text-3xl xl:text-3xl 2xl:text-3xl">
                {message1}
              </p>
            </div>
            <div className="aqui  flex  w-full    sm:w-full md:h-1/6 lg:h-1/4 xl:h-1/4">
              <div className="m-auto h-auto  md:h-20  md:w-full lg:block lg:w-11/12  xl:w-11/12">
                <div className="m-auto flex h-auto w-full flex-col gap-5 rounded-lg  md:h-20 md:flex-row md:gap-0 md:bg-white ">
                  <div className="flex w-full cursor-pointer flex-col  md:w-2/5 md:flex-row">
                    <div className="  h-full w-full border-r">
                      <div className="flex h-full w-full items-center md:m-auto ">
                        <input
                          onChange={locationInfo}
                          className="text-md m-auto h-11 w-full truncate rounded-sm border border-yellow-new  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 md:w-95 md:p-0"
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
                  <div className="flex h-20 w-full gap-2 bg-white md:w-1/2">
                    <div className=" m-auto flex h-full w-full  cursor-pointer truncate  bg-white ">
                      <DatePicker
                        label={message4}
                        value={
                          checkInDate < checkOutDate ? checkInDate : checkInDate
                        }
                        onChange={handleCheckInDateChange}
                        minDate={today}
                        sx={{
                          "& .MuiInputLabel-root": { color: "gray" },
                          margin: "auto",
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
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
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              border: "1px solid black",
                            },
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex w-full cursor-pointer flex-col gap-5 md:w-2/5 md:flex-row md:gap-0 ">
                    <div className="relative  inline-block h-11 w-full cursor-pointer bg-white md:h-full md:w-55">
                      <div
                        onClick={guestsOpen}
                        className="m-auto flex h-full w-90 "
                      >
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
                      className=" flex h-9 w-full cursor-pointer truncate rounded-xl bg-yellow-new md:m-auto md:h-4/5 md:w-2/5"
                    >
                      <p className="m-auto truncate text-center font-fira-sans text-sm  font-semibold text-white md:text-sm lg:text-base xl:text-xl">
                        {message6}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=" flex h-56 w-full flex-col  md:hidden">
              <div className="flex h-full justify-center  ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Venta o Alquiler
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer border-2 bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Tipo de inmueble
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center  ">
                <div className=" m-auto flex h-5/6 w-full cursor-pointer border-2  bg-white hover:border-blue-new">
                  <p className="m-auto text-center font-open-sans text-base font-bold">
                    Lugar
                  </p>
                </div>
              </div>
              <div className="flex h-full justify-center ">
                <div className="m-auto flex h-5/6 w-full cursor-pointer rounded-xl bg-yellow-new">
                  <p className="m-auto text-center font-fira-sans text-base font-bold text-white ">
                    Buscar Propiedad
                  </p>
                </div>
              </div>
            </div> */}
            </div>

            <div className="flex h-15 w-full justify-center">
              <p className="m-auto font-open-sans text-xl font-semibold text-white">
                {message7}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Vacations;
