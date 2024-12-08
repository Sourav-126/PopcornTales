import { Link } from "react-router-dom";
import noimage from "../../assets/images.png";
const HorizontalCards = ({ data }: { data: any }) => {
  console.log(data);

  return (
    <div className="w-full flex overflow-y-auto mb-5 p-3">
      {data.length > 0 ? (
        data.map((d: any, i: any) => (
          <Link
            to={`/${d.media_type || "movie"}/details/${d.id}`}
            key={i}
            className="min-w-[15%] max-h-[50vh] bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
            ></img>
            <div className="text-white p-3 h-[45%]">
              <h1 className=" text-xl  font-semibold ">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="w-[70%] mt-3 mb-3 overflow-y-auto">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-300"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center mt-5">
          No Recommendations found
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
