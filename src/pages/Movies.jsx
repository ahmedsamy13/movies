import Card from "@/components/ui/card";
import Taps from "@/components/ui/Tabs";
import { tabs } from "@/constants";
import { fetchTrendingMovies } from "@/features/movies/movieSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);

  function parseRuntime(runtime) {
    if (!runtime) return 0;
    const hours = runtime.match(/(\d+)h/)?.[1] || 0;
    const mins = runtime.match(/(\d+)m/)?.[1] || 0;
    return Number(hours) * 60 + Number(mins);
  }

  const processedMovies = useMemo(() => {
    let result = [...data];

    if (activeTab === "Top Rated") {
      result = result
        .filter((m) => m.ratings?.imdb?.rating)
        .sort(
          (a, b) =>
            (b.ratings?.imdb?.rating || 0) - (a.ratings?.imdb?.rating || 0),
        );
    }

    if (activeTab === "New Releases") {
      result = result.sort(
        (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0),
      );
    }

    if (activeTab === "Long Movies") {
      result = result.filter((movie) => parseRuntime(movie.runtime) > 120);
    }
    if (activeTab === "Short Movies") {
      result = result.filter((movie) => parseRuntime(movie.runtime) < 120);
    }
    return result;
  }, [data, activeTab]);

  useEffect(() => {
    if (!data.length) dispatch(fetchTrendingMovies());
  }, [dispatch, data.length]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-1 animate-fadeIn">
          Movies
        </h1>
        <p className="text-zinc-500 text-sm mb-4 animate-fadeIn">
          Discover trending and top-rated movies
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto scrollbar-hide">
            <Taps
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[14px] overflow-hidden bg-zinc-900 animate-pulse"
              >
                <div className="aspect-[2/3] bg-zinc-800" />
                <div className="p-2.5 space-y-2">
                  <div className="h-2.5 bg-zinc-800 rounded w-3/4" />
                  <div className="h-2 bg-zinc-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <p className="text-red-400 font-medium mb-2">
            Failed to load movies
          </p>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchTrendingMovies())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Movies Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {processedMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-5xl">🎬</span>
              <p className="text-zinc-400 font-medium">
                No movies found for this filter
              </p>
              <button
                onClick={() => setActiveTab("all")}
                className="text-blue-500 text-sm hover:underline mt-2"
              >
                Show all movies
              </button>
            </div>
          ) : (
            <>
              <p className="text-zinc-500 text-sm mb-6">
                {processedMovies.length} movie
                {processedMovies.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 stagger-children">
                {processedMovies.map((movie) => (
                  <Card
                    key={movie.ids?.simkl_id ?? movie.title}
                    show={movie}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
