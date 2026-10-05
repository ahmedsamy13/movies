import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "@/features/movies/movieSlice";
import { fetchTrendingTvs } from "@/features/TVs/tvSlice";
import Card from "@/components/ui/card";

// ── Skeleton Card ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="w-[160px] flex-shrink-0 rounded-[14px] overflow-hidden bg-zinc-900 animate-pulse">
      <div className="aspect-[2/3] bg-zinc-800" />
      <div className="p-2.5 space-y-2">
        <div className="h-2.5 bg-zinc-800 rounded w-3/4" />
        <div className="h-2 bg-zinc-800 rounded w-1/2" />
      </div>
    </div>
  );
}

// ── Horizontal Scroll Row ──────────────────────────────────────
function ScrollRow({ title, emoji, items, loading, linkTo }) {
  const rowRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <section className="mb-14">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl"></span>
          <h2 className="text-white font-bold text-xl tracking-tight">
            {title}
          </h2>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />
        </div>
        <Link
          to={linkTo}
          className="text-xs text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1 group"
        >
          See all
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Scroll container */}
      <div className="relative group/row">
        {/* Left arrow */}
        {canLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-0 bottom-0 z-10 w-16 flex items-center justify-start pl-2 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </button>
        )}

        {/* Right arrow */}
        {canRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-0 bottom-0 z-10 w-16 flex items-center justify-end pr-2 bg-gradient-to-l from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.slice(0, 20).map((item) => (
                <div
                  key={item.ids?.simkl_id ?? item.title}
                  className="flex-shrink-0 w-[160px]"
                >
                  <Card show={item} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

// ── Hero Banner ────────────────────────────────────────────────
function HeroBanner({ movies }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const featured = movies
    .filter((m) => m.fanart && m.ratings?.imdb?.rating >= 8)
    .slice(0, 5);

  useEffect(() => {
    if (!featured.length) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % featured.length);
        setFading(false);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured.length) return null;

  const movie = featured[current];
  const fanart = `https://wsrv.nl/?url=https://simkl.in/fanart/${movie.fanart}_medium.webp`;
  const poster = `https://wsrv.nl/?url=https://simkl.in/posters/${movie.poster}_m.webp`;

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden mb-14 group">
      {/* Background fanart */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={fanart}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Content */}
      <div
        className={`absolute inset-0 flex items-end p-8 md:p-12 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex gap-6 items-end max-w-2xl">
          {/* Poster */}
          <img
            src={poster}
            alt={movie.title}
            className="hidden sm:block w-28 rounded-xl shadow-2xl flex-shrink-0 border border-white/10"
          />
          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              {movie.ratings?.imdb?.rating && (
                <span className="bg-[#f5c518] text-black text-xs font-bold px-2 py-0.5 rounded">
                  {movie.ratings.imdb.rating} IMDb
                </span>
              )}
              {movie.runtime && (
                <span className="text-zinc-400 text-xs bg-zinc-800/70 px-2 py-0.5 rounded">
                  {movie.runtime}
                </span>
              )}
              <span className="text-zinc-400 text-xs">
                {movie.release_date?.split("/")?.[2]}
              </span>
            </div>
            <h1 className="text-white font-black text-3xl md:text-4xl leading-tight tracking-tight line-clamp-2">
              {movie.title ?? ""}
            </h1>
            <div className="flex gap-3">
              <Link
                to={`/movies/${movie.ids?.simkl_id}`}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Details
              </Link>
              <Link
                to="/movies"
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all border border-white/10"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => {
                setCurrent(i);
                setFading(false);
              }, 300);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Stats Strip ────────────────────────────────────────────────
function StatsStrip({ movies, tvs }) {
  const topRated = movies.filter(
    (m) => (m.ratings?.imdb?.rating || 0) >= 8.5,
  ).length;
  const newReleases = movies.filter((m) => {
    const year = m.release_date?.split("/")?.[2];
    return year >= "2025";
  }).length;

  const stats = [
    { label: "Trending Movies", value: movies.length },
    { label: "Trending Series", value: tvs.length },
    { label: "Highly Rated (8.5+)", value: topRated },
    { label: "New in 2025–26", value: newReleases },
  ];

  if (!movies.length && !tvs.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl px-4 py-4 flex items-center gap-3"
        >
          <span className="text-2xl"></span>
          <div>
            <div className="text-white font-bold text-xl">{stat.value}</div>
            <div className="text-zinc-500 text-xs">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Home ──────────────────────────────────────────────────
const Home = () => {
  const dispatch = useDispatch();
  const { data: movies, loading: moviesLoading } = useSelector(
    (state) => state.movie,
  );
  const { data: tvs, loading: tvsLoading } = useSelector((state) => state.tv);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!movies.length) dispatch(fetchTrendingMovies());
    if (!tvs.length) dispatch(fetchTrendingTvs());
  }, [dispatch]);

  const newMovies = [...movies]
    .filter((m) => m.release_date)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  const topMovies = [...movies]
    .filter((m) => m.ratings?.imdb?.rating)
    .sort((a, b) => b.ratings.imdb.rating - a.ratings.imdb.rating);

  return (
    <div className="min-h-screen text-white">
      <div className="py-2">
        {/* Welcome greeting */}
        {isAuthenticated && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-zinc-500 text-sm">Welcome back,</span>
            <span className="text-white text-sm font-semibold">
              {user?.email?.split("@")[0]}
            </span>
            <span className="text-lg"></span>
          </div>
        )}

        {/* Hero */}
        {!moviesLoading && movies.length > 0 && <HeroBanner movies={movies} />}

        {/* Hero skeleton */}
        {moviesLoading && (
          <div className="w-full h-[420px] rounded-2xl bg-zinc-900 animate-pulse mb-14" />
        )}

        {/* Stats */}
        {!moviesLoading && !tvsLoading && (
          <StatsStrip movies={movies} tvs={tvs} />
        )}

        {/* Scroll rows */}
        <div>
          <ScrollRow
            title="Trending Movies"
            items={movies}
            loading={moviesLoading}
            linkTo="/movies"
          />
          <ScrollRow
            title="Top Rated Movies"
            items={topMovies}
            loading={moviesLoading}
            linkTo="/movies"
          />
          <ScrollRow
            title="Trending Series"
            items={tvs}
            loading={tvsLoading}
            linkTo="/series"
          />
          <ScrollRow
            title="New Releases"
            items={newMovies}
            loading={moviesLoading}
            linkTo="/movies"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
