import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import { useState } from "react";
import axios from "../../utils/axios";
import VerticalCards from "./VerticalCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

interface TrendingCard {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState<TrendingCard[]>([]);
  const [, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  document.title = "Trending";
  const GetTrendingCards = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      // setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

      setPage(page + 1);
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = async () => {
    if (trending.length == 0) {
      GetTrendingCards();
    } else {
      setPage(1);
      setTrending([]);
      GetTrendingCards();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  console.log(trending);

  return trending.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e: any) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day", "month"]}
            func={(e: any) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrendingCards}
        hasMore={true}
        loader={<h1>Loading.....</h1>}
      >
        <VerticalCards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;

// Infinite Scroll Components lagane hai:done
