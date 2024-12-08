// import React from "react"
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[19%] h-screen border-r-2 border-zinc-400 p-10  overflow-hidden overflow-y-auto ">
      <h1 className="text-xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill text-xl mr-2"></i>
        <span className="text-2xl text-white	">Popcorn Tales</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className=" mr-2 ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-bard-fill"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-movie-2-ai-fill"></i>
          Movies
        </Link>
        <Link
          to="/tvshows"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-tv-fill"></i>
          TV shows
        </Link>
        <Link
          to="/artists"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-user-star-fill"></i>
          Artists
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 ">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          More Info.
        </h1>
        <Link
          to="/aboutUs"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-information-2-fill"></i>
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:text-white hover:bg-[#6556CD] p-4 duration-300 rounded-lg"
        >
          <i className="mr-2 ri-phone-fill"></i>
          Contact us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;

//changed xl to l because ui got fucked find a thing that helps transforms the text//done with this:- overflow
