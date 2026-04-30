import { addItem } from "@/features/watchList/watchListSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Card({ show }) {
  const poster = `https://wsrv.nl/?url=https://simkl.in/posters/${show.poster}_m.webp`;
  const year = show.release_date?.split("/")[2];
  const isPremierre = show.status === "premiere";
  const dispatch = useDispatch();
  function handleAddToWatchList(e) {
    e.preventDefault();
    const newMovie = {
      id: show.ids.simkl_id,
      rating: show.ratings?.imdb?.rating,
      runtime: show.runtime,
      poster: poster,
      year: show.year,
    };
    dispatch(addItem(newMovie));
  }
  return (
    <Link
      to={`/movies/${show.ids.simkl_id}`}
      className="group relative w-[180px] rounded-[14px] overflow-hidden bg-[#111] cursor-pointer flex-shrink-0"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt="poster"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

        {/* IMDb badge */}
        {show.ratings?.imdb?.rating && (
          <span className="absolute top-2.5 left-2.5 bg-[#f5c518] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
            {show.ratings.imdb.rating} IMDb
          </span>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-2.5 right-2.5 text-[9px] font-semibold px-1.5 py-0.5 rounded ${
            isPremierre
              ? "bg-red-500/85 text-white"
              : "bg-white/10 text-white/80"
          }`}
        >
          {isPremierre ? "Premiere" : "Ended"}
        </span>
      </div>

      {/* Info */}
      <div className="p-2.5 pb-3 bg-[#111]">
        <p className="text-white text-[12px] font-semibold truncate mb-1"></p>
        <div className="flex items-center gap-1.5 text-[10px] text-white/45">
          <span>{year}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{show.runtime}</span>
        </div>

        {/* Rating + Add button */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.07]">
          <div className="flex items-center gap-1 text-[11px] text-white/70">
            <span className="text-[#f5c518]">★</span>
            {show.ratings?.simkl?.rating}
          </div>
          <button
            onClick={handleAddToWatchList}
            className="w-[26px] h-[26px] rounded-full bg-white/[0.08] border border-white/15 text-white text-sm flex items-center justify-center hover:bg-white/[0.18] transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}
