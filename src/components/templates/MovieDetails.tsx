import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../store/reducers/movieSlice";
import asyncLoadMovie from "../../store/actions/movieActions";
import noimage from "../../assets/images.png";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../templates/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const { info } = useSelector((state: any) => state.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-full px-[5%] pb-20 overflow-x-hidden"
    >
      <nav className="h-[10vh] mt-5 mb-5 items-center w-full text-zinc-100 flex gap-10 text-xl">
        <Link
          to="/"
          onClick={() => navigate(-1)}
          className="text-2xl hover:text-[#6556CD] duration-200 ri-arrow-left-line"
        ></Link>
        <a
          className="hover:text-[#6556CD] uppercase font-semibold  duration-200"
          target="_blank"
          href={info.detail.homepage}
        >
          {/* <i className="ri-external-link-line"></i> */}Web
        </a>
        <a
          className="hover:text-[#6556CD] uppercase font-semibold  duration-200"
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          {/* <i className="ri-earth-fill"></i> */}WIKI
        </a>
        <a
          className="hover:text-[#6556CD] uppercase font-semibold  duration-200"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>

      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
          src={
            info.detail.poster_path || info.detail.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.poster_path || info.detail.backdrop_path
                }`
              : noimage
          }
          alt=""
        />
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex mt-5 mb-5 items-center gap-x-10">
            <span className=" text-white text-xl font-semibold w-[6vh] h-[6vh] flex justify-center items-center bg-yellow-600 rounded-full">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl">Rating</h1>
            <h1 className="pt-2 font-medium">{info.detail.release_date}</h1>
            <h1 className="pt-2 font-medium">
              {info.detail.genres.map((g: any) => g.name).join(", ")}
            </h1>
            <h1 className="pt-2 font-medium">{info.detail.runtime} min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mb-3 mt-5">Available in Languages</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-5 rounded-lg bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-large-fill text-xl mr-2"></i>Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] mt-10 flex flex-col gap-y-5">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platforms</h1>
            {info.watchProviders.flatrate.map((w: any, i: any) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1 className="pr-8 ">Available on Rent</h1>
            {info.watchProviders.rent.map((w: any, i: any) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1 className="pr-10">Available to Buy</h1>
            {info.watchProviders.buy.map((w: any, i: any) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="mb-8 text-3xl font-bold text-white mt-9">
        Recommendations and Similar
      </h1>

      <div className="mt-5 overflow-x-auto">
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
