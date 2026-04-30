import { useState, useCallback, useRef } from "react";
import search from "@/services/search";
import Card from "@/components/ui/card";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const timer = useRef(null);

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

  return (
    <div className="text-white">
      <div className="sticky top-[57px] z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06] -mx-[5vw] px-4 py-4">
        <div className="max-w-2xl mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search movies, shows, anime..."
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all duration-200"
          />
          {loading && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg
                className="animate-spin w-4 h-4 text-white/40"
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
      </div>

      <div className="py-8">
        {results.length > 0 && (
          <>
            <p className="text-white/40 text-sm mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="text-white/70">"{query}"</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {results.map((item) => (
                <Card
                  key={`${item.type}-${item.ids?.simkl_id ?? item.title}`}
                  show={item}
                />
              ))}
            </div>
          </>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl">🎬</span>
            <p className="text-white/50 text-sm">
              No results found for{" "}
              <span className="text-white/70">"{query}"</span>
            </p>
          </div>
        )}

        {!query && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl">🍿</span>
            <p className="text-white/30 text-sm">
              Search for your favorite movies & shows
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
