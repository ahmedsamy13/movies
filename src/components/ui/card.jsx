import { addItem } from "@/features/watchList/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Card({ show }) {
  const poster = show.poster
    ? `https://wsrv.nl/?url=https://simkl.in/posters/${show.poster}_m.webp`
    : null;
  const year = show.year || show.release_date?.split("/")?.[2];
  const isPremierre = show.status === "premiere";
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.watchList.watchList);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const itemId = show.ids?.simkl_id;
  const isInWatchList = watchList.some(
    (item) => String(item.id) === String(itemId),
  );

  // Determine the correct link path based on type
  const type = show.type || "movie";
  const linkPath =
    type === "tv" || type === "anime"
      ? `/series/${itemId}`
      : `/movies/${itemId}`;

  function handleAddToWatchList(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isInWatchList) {
      setToastMsg("Already in your watchlist!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const newItem = {
      id: String(itemId),
      title: show.title,
      rating: show.ratings?.imdb?.rating || show.ratings?.simkl?.rating,
      runtime: show.runtime,
      poster: poster,
      year: show.year,
      type: type,
    };
    dispatch(addItem(newItem));
    setToastMsg("Added to watchlist! ✓");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <Link
      to={linkPath}
      className="group relative w-full rounded-[14px] overflow-hidden bg-[#111] cursor-pointer block transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Toast */}
      {showToast && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-zinc-900/95 border border-zinc-700 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-2xl animate-scaleIn backdrop-blur-md whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        {poster ? (
          <img
            src={poster}
            alt={show.title || "poster"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-zinc-800">
            🎬
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay with title */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm font-bold leading-tight line-clamp-2 drop-shadow-lg">
            {show.title}
          </p>
        </div>

        {/* IMDb badge */}
        {show.ratings?.imdb?.rating && (
          <span className="absolute top-2.5 left-2.5 bg-[#f5c518] text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md">
            {show.ratings.imdb.rating} IMDb
          </span>
        )}

        {/* Type badge for search results */}
        {show.type && (
          <span
            className={`absolute top-2.5 right-2.5 text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase ${
              show.type === "movie"
                ? "bg-blue-500/85 text-white"
                : show.type === "anime"
                  ? "bg-purple-500/85 text-white"
                  : "bg-emerald-500/85 text-white"
            }`}
          >
            {show.type}
          </span>
        )}

        {/* Status badge (only if no type badge) */}
        {!show.type && show.status && (
          <span
            className={`absolute top-2.5 right-2.5 text-[9px] font-semibold px-1.5 py-0.5 rounded ${
              isPremierre
                ? "bg-red-500/85 text-white"
                : "bg-white/10 text-white/80"
            }`}
          >
            {isPremierre ? "Premiere" : "Ended"}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 pb-3 bg-[#111]">
        <p className="text-white text-[12px] font-semibold truncate mb-1">
          {show.title}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-white/45">
          <span>{year}</span>
          {show.runtime && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{show.runtime}</span>
            </>
          )}
        </div>

        {/* Rating + Add button */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.07]">
          <div className="flex items-center gap-1 text-[11px] text-white/70">
            <span className="text-[#f5c518]">★</span>
            {show.ratings?.simkl?.rating || show.ratings?.imdb?.rating || "–"}
          </div>
          <button
            onClick={handleAddToWatchList}
            className={`w-[26px] h-[26px] rounded-full border text-sm flex items-center justify-center transition-all duration-200 ${
              isInWatchList
                ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                : "bg-white/[0.08] border-white/15 text-white hover:bg-white/[0.18] hover:scale-110"
            }`}
            title={isInWatchList ? "In watchlist" : "Add to watchlist"}
          >
            {isInWatchList ? "✓" : "+"}
          </button>
        </div>
      </div>
    </Link>
  );
}
