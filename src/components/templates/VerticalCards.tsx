import { Link } from "react-router-dom";

const VerticalCards = ({ data, title }: { data: any; title: any }) => {
  return (
    <div className="flex flex-wrap w-full h-full px-[5%] bg-[#1F1E24]">
      {data.map((c: any, i: any) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className=" relative w-[25vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="h-[40vh] object-cover  shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.profile_path || c.poster_path
            } )`}
            alt="NF"
          />
          <h1 className="font-semibold text-zinc-400 mt-3 text-2xl">
            {c.name || c.original_name || c.title || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600  text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
      console.log(data)
    </div>
  );
};

export default VerticalCards;
