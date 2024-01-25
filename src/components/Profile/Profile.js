import React from "react";
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
// import bed from "../../images/bed.png";
import "./Profile.css";

const Profile = () => {
  //const navigate = useNavigate();

  return (
    <div className="ajusta">
      <div class="mt-12 flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
        <aside class="hidden py-4 md:block md:w-1/3 lg:w-1/4">
          <div class="sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-sm">
            <h2 class="mb-4 pl-3 text-2xl font-semibold">Settings</h2>

            <a
              href="/"
              class="flex items-center rounded-full border bg-white px-3  py-2.5 font-bold text-indigo-900"
            >
              Pubic Profile
            </a>
            <a
              href="/"
              class="flex items-center px-3 py-2.5 font-semibold  hover:rounded-full hover:border hover:text-indigo-900"
            >
              Account Settings
            </a>
          </div>
        </aside>
        <main class="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
          <div class="p-2 md:p-4">
            <div class="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
              <h2 class="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

              <div class="mx-auto mt-8 grid max-w-2xl">
                <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    class="h-40 w-40 rounded-full object-cover p-1 ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src=""
                    alt=""
                  ></img>

                  <div class="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      class="rounded-lg border border-indigo-200 bg-[#202142] px-7 py-3.5 text-base font-medium text-indigo-100 hover:bg-indigo-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 "
                    >
                      Change picture
                    </button>
                    <button
                      type="button"
                      class="rounded-lg border border-indigo-200 bg-white px-7 py-3.5 text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 "
                    >
                      Delete picture
                    </button>
                  </div>
                </div>

                <div class="mt-8 items-center text-[#202142] sm:mt-14">
                  <div class="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div class="w-full">
                      <label
                        for="first_name"
                        class="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your first name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                        placeholder="Your first name"
                        value=""
                        required
                      ></input>
                    </div>

                    <div class="w-full">
                      <label
                        for="last_name"
                        class="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                        placeholder="Your last name"
                        value=""
                        required
                      ></input>
                    </div>
                  </div>

                  <div class="mb-2 sm:mb-6">
                    <label
                      for="email"
                      class="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500 "
                      placeholder="your.email@mail.com"
                      required
                    ></input>
                  </div>

                  <div class="flex justify-end">
                    <button
                      type="submit"
                      class="w-full rounded-lg  bg-blue-dark px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Profile;
