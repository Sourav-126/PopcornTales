// import React from "react"
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state: any) => state[category].info.videos);

  return ytVideo ? (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-100 top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        to=""
        onClick={() => navigate(-1)}
        className="absolute  text-white text-3xl hover:text-[#6556CD] duration-200 ri-close-fill right-[5%] top-[5%]"
      ></Link>
      <ReactPlayer
        height={500}
        width={1000}
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
      />
    </div>
  ) : (
    <NotFound />
  );
};

export default Trailer;
