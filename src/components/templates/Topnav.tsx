import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axios";
import images from "../../assets/images.png";
interface searchResult {
  id: number;
  title: string;
  imageUrl: string;
  original_title: string;
  original_name: string;
  backdrop_path: string;
  profile_path: string;
  media_type: string;
  name: string;
}

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const response = await axios.get(`/search/multi?query=${query}`);
      // console.log(response.data);
      setSearches(response.data.results);
      // console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[50%] h-[10vh] relative flex  mx-auto items-center">
      <i className=" text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="  w-[80%] mx-10 outline-none border-none bg-transparent rounded text-zinc-400"
        type="text"
        placeholder="Search for Movies,TV shows,WebSeries........."
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl ri-close-fill cursor-pointer"
        ></i>
      )}

      <div className="z-[10] absolute w-[90%] max-h-[50vh] top-[90%] bg-zinc-200 rounded-lg overflow-auto">
        {searches.map((s: searchResult, i) => (
          <Link
            to={`${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 text-zinc-600 font-semibold w-[100%] p-10 flex justify-start border-b-2 border-zinc-100 items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }`} // Fallback to a default image if `imageUrl` is unavailable
              alt=""
              className="w-12 h-12 object-cover rounded-lg mr-4"
            />
            <span className="text-zinc-700 font-medium">
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
