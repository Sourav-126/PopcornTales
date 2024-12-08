import axios from "../../utils/axios";
import { useEffect, useState } from "react";
// import useNavigate from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import VerticalCards from "./VerticalCards";
import Dropdown from "./Dropdown";
import Topnav from "./Topnav";

interface PeopleCard {
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
const Peoples = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState<PeopleCard[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "Artists";

  const GetPeopleCards = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      // setTrending(data.results);
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
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
    if (people.length == 0) {
      GetPeopleCards();
    } else {
      setPage(1);
      setPeople([]);
      GetPeopleCards();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  console.log(people);

  return people.length > 0 ? (
    <div className="  w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className=" text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] cursor-pointer ri-arrow-left-line"
          ></i>
          Artists
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />

          <div className="w-[2%]"></div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={GetPeopleCards}
        hasMore={true}
        loader={<h1>Loading.....</h1>}
      >
        <VerticalCards data={people} title="persons" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Peoples;
