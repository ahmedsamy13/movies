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
    let result = data;

    if (activeTab === "Top Rated") {
      result = [...result].sort(
        (a, b) => b.ratings.imdb.rating - a.ratings.imdb.rating,
      );
    }

    if (activeTab === "New Releases") {
      result = [...result].sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
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
    dispatch(fetchTrendingMovies());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Tabs */}
      <div className=" flex justify-center align-middle">
        <div className=" top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto scrollbar-hide">
            <Taps
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {processedMovies.map((movie) => (
            <Card key={movie.ids?.simkl_id ?? movie.title} show={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
