import {
  clearWatchList,
  removeItem,
} from "@/features/watchList/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function WatchList() {
  const watchList = useSelector((state) => state.watchList.watchList);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClear = () => {
    dispatch(clearWatchList());
    setShowConfirm(false);
  };

  return (
    <div className="text-white min-h-[70vh]">
      {/* Header */}
      <div className="mb-10 animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          My Watch List
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Save your favorite movies and TV shows to watch later.
        </p>
      </div>

      {/* Empty */}
      {watchList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
          <div className="w-24 h-24 rounded-full bg-zinc-900/80 flex items-center justify-center border border-zinc-800 mb-6 text-zinc-500 font-bold text-2xl">
            Empty
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Your watch list is empty
          </h2>
          <p className="text-zinc-400 mb-6 max-w-md">
            Start adding movies or TV shows to keep track of what you want to
            watch.
          </p>
          <div className="flex gap-3">
            <Link
              to="/movies"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
            >
              Browse Movies
            </Link>
            <Link
              to="/series"
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 border border-zinc-700"
            >
              Browse Series
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Counter + Actions */}
          <div className="flex items-center justify-between mb-6 animate-fadeIn">
            <span className="text-zinc-400 text-sm">
              {watchList.length} Item{watchList.length !== 1 ? "s" : ""}
            </span>

            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-red-600/20 border border-zinc-800 hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all text-sm font-medium"
              >
                Clear All
              </button>
            ) : (
              <div className="flex items-center gap-2 animate-scaleIn">
                <span className="text-zinc-500 text-sm">Are you sure?</span>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all active:scale-95"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 stagger-children">
            {watchList.map((item) => {
              const linkPath =
                item.type === "tv" || item.type === "anime"
                  ? `/series/${item.id}`
                  : `/movies/${item.id}`;

              return (
                <div
                  key={item.id}
                  className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-zinc-800/60 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Poster */}
                  <Link to={linkPath}>
                    <div className="aspect-[2/3] overflow-hidden bg-zinc-800 relative">
                      {item.poster ? (
                        <img
                          src={item.poster}
                          alt={item.title || "poster"}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-800 font-bold">
                          No Image
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    {item.title && (
                      <p className="text-white text-sm font-semibold truncate mb-2">
                        {item.title}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                      <span>{item.year || "N/A"}</span>
                      <span className="text-yellow-400 font-semibold">
                        ★ {item.rating || "–"}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this item?")) {
                          dispatch(removeItem(item.id));
                        }
                      }}
                      className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30 border border-zinc-700 transition-all active:scale-95 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
