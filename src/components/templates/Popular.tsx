import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import VerticalCards from "./VerticalCards";
import Dropdown from "./Dropdown";
import Topnav from "./Topnav";

interface PopularCard {
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
const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState<PopularCard[]>([]);
  const [, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "Popular";

  const GetPopularCards = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
    if (popular.length == 0) {
      GetPopularCards();
    } else {
      setPage(1);
      setPopular([]);
      GetPopularCards();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  console.log(popular);

  return popular.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e: any) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopularCards}
        hasMore={true}
        loader={<h1>Loading.....</h1>}
      >
        <VerticalCards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
