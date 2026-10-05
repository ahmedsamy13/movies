import { useState, useRef } from "react";
import search from "@/services/search";
import Card from "@/components/ui/card";

const FILTER_TABS = [
  { key: "all", label: "All", emoji: "🎯" },
  { key: "movie", label: "Movies", emoji: "🎬" },
  { key: "tv", label: "TV Shows", emoji: "📺" },
  { key: "anime", label: "Anime", emoji: "🌸" },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const timer = useRef(null);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      clearTimeout(timer.current);
      return;
    }

    setLoading(true);
    clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      try {
        const data = await search(value);
        setResults(data);
        setSearched(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
    setLoading(false);
    clearTimeout(timer.current);
    inputRef.current?.focus();
  };

  // Filter results by type
  const filteredResults =
    activeFilter === "all"
      ? results
      : results.filter((item) => item.type === activeFilter);

  // Count per type
  const counts = {
    all: results.length,
    movie: results.filter((i) => i.type === "movie").length,
    tv: results.filter((i) => i.type === "tv").length,
    anime: results.filter((i) => i.type === "anime").length,
  };

  return (
    <div className="text-white min-h-[70vh]">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 animate-fadeIn">
          Search
        </h1>
        <p className="text-zinc-500 text-sm animate-fadeIn">
          Find movies, TV shows, and anime
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl relative mb-6 animate-fadeInUp">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search movies, shows, anime..."
          autoFocus
          className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl pl-12 pr-12 py-4 text-base text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
        />
        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors p-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {/* Loading spinner */}
        {loading && (
          <span className="absolute right-12 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin w-5 h-5 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
          </span>
        )}
      </div>

      {/* Filter Tabs — only show when we have results */}
      {results.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap animate-fadeIn">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeFilter === tab.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span className="text-sm">{tab.emoji}</span>
              {tab.label}
              {counts[tab.key] > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeFilter === tab.key
                      ? "bg-white/20"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="py-2">
        {filteredResults.length > 0 && (
          <>
            <p className="text-zinc-500 text-sm mb-6">
              {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} for{" "}
              <span className="text-white/80 font-medium">"{query}"</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 stagger-children">
              {filteredResults.map((item) => (
                <Card
                  key={`${item.type}-${item.ids?.simkl_id ?? item.title}`}
                  show={item}
                />
              ))}
            </div>
          </>
        )}

        {/* No results for active filter */}
        {searched &&
          !loading &&
          results.length > 0 &&
          filteredResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 animate-fadeIn">
              <span className="text-5xl">🔍</span>
              <p className="text-zinc-500 text-sm">
                No {FILTER_TABS.find((t) => t.key === activeFilter)?.label} found
                for <span className="text-white/70">"{query}"</span>
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-2 text-blue-500 text-sm hover:underline"
              >
                Show all results
              </button>
            </div>
          )}

        {/* No results at all */}
        {searched && !loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-2">
              <span className="text-4xl">🎬</span>
            </div>
            <p className="text-zinc-400 text-base font-medium">
              No results found
            </p>
            <p className="text-zinc-600 text-sm">
              Try searching for{" "}
              <span className="text-white/60">"{query}"</span> with different
              keywords
            </p>
          </div>
        )}

        {/* Initial empty state */}
        {!query && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fadeIn">
            <div className="w-24 h-24 rounded-full bg-zinc-900/80 flex items-center justify-center border border-zinc-800 mb-2">
              <span className="text-5xl">🍿</span>
            </div>
            <p className="text-zinc-400 text-base font-medium">
              Search for your favorite movies & shows
            </p>
            <p className="text-zinc-600 text-sm">
              Type in the search box above to get started
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {["Inception", "Breaking Bad", "Naruto", "The Godfather"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch({ target: { value: suggestion } });
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm hover:text-white hover:border-zinc-700 transition-all"
                  >
                    {suggestion}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
