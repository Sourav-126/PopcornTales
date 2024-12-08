import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";

// import Dropdown from "./partials/Dropdown"
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown";
import { asyncloadperson } from "../../store/actions/peopleActions";
import { removePerson } from "../../store/reducers/peopleSlice";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="px-[5%] pr-[10%] w-screen flex flex-col bg-[#1F1E24] h-fit pb-20 overflow-x-hidden">
      {/* Part 1 navigation */}
      <nav className="h-[10vh] mt-12 mb-5 items-center w-full text-zinc-100 flex gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xl  hover:text-[#6556CD] duration-200 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part 2 left Poster and dettails */}
        <div className="w-[20%] pl-5 ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[53vh] object-cover"
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : "noimage"
            }
            alt=""
          />
          <hr className="mt-10 border-none h-[2px] bg-zinc-500 mb-3" />

          {/* External Links */}

          <div className="text-3xl text-white flex gap-x-10">
            <a
              className="hover:text-[#6556CD] uppercase font-semibold  duration-200"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              {/* <i className="ri-earth-fill"></i> */}WIKI
            </a>
            <a
              className="hover:text-[#6556CD] duration-200"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              className="hover:text-[#6556CD] uppercase duration-200"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              className="hover:text-[#6556CD] uppercase duration-200"
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold ">Profession</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Date of Birth
          </h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

          {info.detail.deathday && (
            <>
              <h1 className="text-lg text-zinc-400 font-semibold mt-3">
                Deathday
              </h1>
              <h1 className=" text-zinc-400 ">{info.detail.deathday}</h1>
            </>
          )}

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Part 3 RIGHT DETAILS AND INFORMATION */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 mt-8 font-semibold ">
            Overview
          </h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-xl mb-5 text-zinc-400 font-semibold mt-6">
            Casted In
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl mb-5 text-zinc-400 font-semibold mt-6">
              Acting
            </h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func=""
              handleSetCategoryFilter={(e: any) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 mt-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c: any, i: any) => (
              <li
                key={i}
                className="hover:text-white p-5 hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span className="">
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  {c.character && (
                    <span className="block mt-2 ml-5">
                      Charecter Name : {c.character}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
