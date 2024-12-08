import { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";

const Home = () => {
  document.title = "HomePage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const response = await axios.get(`/trending/all/day`);

      let randomData =
        response.data.results[
          (Math.random() * response.data.results.length).toFixed()
        ];
      setWallpaper(randomData);
      // console.log(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrendingCards = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetTrendingCards();
    !wallpaper && GetHeaderWallpaper();
    GetTrendingCards();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" flex justify-between p-5">
          <h1 className=" text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e: any) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
