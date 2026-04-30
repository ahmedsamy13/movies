import {
  clearWatchList,
  removeItem,
} from "@/features/watchList/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WatchList() {
  const watchList = useSelector((state) => state.watchList.watchList);
  const dispatch = useDispatch();
  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          My Watch List
        </h1>

        <p className="text-zinc-400 text-sm md:text-base">
          Save your favorite movies and TV shows to watch later.
        </p>
      </div>

      {/* Empty */}
      {watchList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-bold mb-3">Your watch list is empty</h2>

          <p className="text-zinc-400 mb-6">Start adding movies or TV shows.</p>

          <Link
            to="/movies"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <>
          {/* Counter */}
          <div className="mb-6">
            <span className="text-zinc-400 text-sm">
              {watchList.length} Items
            </span>
          </div>
          <button
            onClick={() => dispatch(clearWatchList())}
            className="mb-6 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:scale-95 transition font-semibold text-sm md:text-base"
          >
            Clear Watch List
          </button>
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition"
                >
                  {/* Poster */}
                  <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>{item.year || "N/A"}</span>

                      <span className="text-yellow-400 font-semibold">
                        ⭐ {item.rating || "0.0"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="mt-3 w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition active:scale-95 text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
