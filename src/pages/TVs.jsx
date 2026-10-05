import Card from "@/components/ui/card";
import Taps from "@/components/ui/Tabs";
import { seriesTabs } from "@/constants";
import { fetchTrendingTvs } from "@/features/TVs/tvSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tvs() {
  const [activeTab, setActiveTab] = useState("all");

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tv);

  const processedSeries = useMemo(() => {
    let result = [...data];

    if (activeTab === "Top Rated") {
      result = result
        .filter((s) => s.ratings?.imdb?.rating)
        .sort(
          (a, b) =>
            (b.ratings?.imdb?.rating || 0) - (a.ratings?.imdb?.rating || 0),
        );
    }

    if (activeTab === "New Releases") {
      result = result.sort(
        (a, b) =>
          new Date(b.release_date || 0) - new Date(a.release_date || 0),
      );
    }

    return result;
  }, [data, activeTab]);

  useEffect(() => {
    if (!data.length) dispatch(fetchTrendingTvs());
  }, [dispatch, data.length]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="pt-4 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-1 animate-fadeIn">
          TV Series
        </h1>
        <p className="text-zinc-500 text-sm mb-4 animate-fadeIn">
          Explore trending and top-rated TV shows
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center -mx-4 sm:-mx-6 md:-mx-8 mb-6">
        <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto scrollbar-hide">
            <Taps
              tabs={seriesTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-500 font-bold text-2xl">
            !
          </div>
          <p className="text-red-400 font-medium mb-2">
            Failed to load TV shows
          </p>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchTrendingTvs())}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Series Grid */}
      {!loading && !error && (
        <div className="py-2">
          {processedSeries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <span className="text-2xl text-zinc-500 font-bold">No Results</span>
              <p className="text-zinc-400 font-medium">
                No series found for this filter
              </p>
              <button
                onClick={() => setActiveTab("all")}
                className="text-blue-500 text-sm hover:underline mt-2"
              >
                Show all series
              </button>
            </div>
          ) : (
            <>
              <p className="text-zinc-500 text-sm mb-6">
                {processedSeries.length} show
                {processedSeries.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 stagger-children">
                {processedSeries.map((show) => (
                  <Card
                    key={show.ids?.simkl_id ?? show.title}
                    show={{ ...show, type: "tv" }}
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
