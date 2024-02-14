import { React } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useMediaQuery } from "react-responsive";
// import imageFilter from "../../images/image-filter.png";
// import image5 from "../../images/image5.png";
// import image6 from "../../images/image6.png";
// import image7 from "../../images/image7.png";
// import car from "../../images/car.png";
// import house from "../../images/house.png";
// import bath from "../../images/bath.png";
// import account from "../../images/account.png";
import { Header } from "./header";
import "./Landing.css";

const Landing = ({ first, last, email, url }) => {
  return (
    <div className="">
      <div className="mb-3">
        <Header />
      </div>

      <div className="ajusta">
        <div
          className="flex h-96 flex-col rounded-xl bg-slate-200"
          style={{
            backgroundImage: `url(${require("../../images/layer.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className="relative inset-0 rounded-xl bg-black opacity-50"></div> */}
          <div className="flex h-2/4 w-full flex-col">
            <img
              className="m-auto mt-4 h-40 w-40 rounded-full bg-gray-300 object-cover ring-2 dark:ring-white"
              src=""
              alt=""
            />
            <button className="relative bottom-7 left-16 m-auto flex h-7 w-7 rounded-full border bg-gray-300 ring-2 dark:ring-white">
              <p className="m-auto text-center text-lg text-white">+</p>
            </button>
          </div>
          <div className="flex h-30 w-full flex-col border border-black">
            <div className="flex h-full border border-red-500">
              <p className="m-auto text-4xl font-semibold text-white">
                Yesenia Gomez
              </p>
            </div>
            <div className="flex h-full justify-center border border-red-500">
              <p className=" text-xl font-medium text-white">
                Asesora inmobilaria
              </p>
            </div>
          </div>
          <div className="flex h-1/5 w-full justify-center border border-black">
            <div className="mt-2 flex w-auto gap-2 border border-black">
              <p>jsjs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
