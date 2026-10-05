import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTv, fetchTvById } from "@/features/TVs/tvSlice";
import { addItem } from "@/features/watchList/watchListSlice";

export default function Tv() {
  const { serieId } = useParams();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const { selectedTv: tv, loading, error } = useSelector((state) => state.tv);

  const watchList = useSelector((state) => state.watchList.watchList);
  const isInWatchList = watchList.some(
    (item) => String(item.id) === String(serieId),
  );

  useEffect(() => {
    if (serieId) {
      dispatch(fetchTvById(serieId));
    }
    return () => {
      dispatch(clearSelectedTv());
    };
  }, [dispatch, serieId]);

  function handleAddToWatchList(e) {
    e.preventDefault();

    if (isInWatchList) {
      setToastMsg("Already in your watchlist!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    const newSerie = {
      id: String(serieId),
      title: tv.title,
      rating: tv.ratings?.imdb?.rating || tv.ratings?.simkl?.rating,
      poster: tv.poster
        ? `https://simkl.in/posters/${tv.poster}_m.jpg`
        : null,
      year: tv.year,
      type: "tv",
    };
    dispatch(addItem(newSerie));
    setToastMsg("Added to watchlist! ✓");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: tv.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMsg("Link copied! 📋");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <div className="relative h-[300px] md:h-[500px] w-full bg-zinc-900 animate-pulse" />
        <div className="max-w-6xl mx-auto px-6 -mt-24 md:-mt-48 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
            <div className="w-36 md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="w-full aspect-[2/3] rounded-2xl bg-zinc-800 animate-pulse" />
            </div>
            <div className="flex-1 pt-0 md:pt-36 space-y-4">
              <div className="h-10 bg-zinc-800 rounded-xl w-3/4 animate-pulse" />
              <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse" />
              <div className="h-24 bg-zinc-800 rounded-xl w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tv) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <span className="text-4xl">📺</span>
        </div>
        <h2 className="text-2xl font-bold">TV Show not found</h2>
        <p className="text-zinc-500 text-sm">
          The show you're looking for doesn't exist or was removed.
        </p>
        <Link
          to="/series"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all mt-2"
        >
          Back to TV Shows
        </Link>
      </div>
    );
  }

  const posterUrl = tv.poster
    ? `https://simkl.in/posters/${tv.poster}_m.jpg`
    : null;
  const fanartUrl = tv.fanart
    ? `https://simkl.in/fanart/${tv.fanart}_p.jpg`
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-zinc-900/95 border border-zinc-700 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl animate-slideInRight backdrop-blur-md">
          {toastMsg}
        </div>
      )}

      {/* Hero */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
        {fanartUrl ? (
          <img
            src={fanartUrl}
            className="w-full h-full object-cover scale-110 opacity-40"
            alt="background"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <Link
          to="/series"
          className="absolute top-6 left-6 bg-black/60 backdrop-blur-md hover:bg-blue-600 px-4 py-2 rounded-full transition z-20 flex items-center gap-2 text-sm font-medium"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start animate-fadeInUp">
          {/* Poster */}
          <div className="w-36 md:w-1/3 lg:w-1/4 flex-shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:scale-[1.02] transition duration-500 border border-white/5"
                alt={tv.title}
              />
            ) : (
              <div className="w-full aspect-[2/3] rounded-2xl bg-zinc-800 flex items-center justify-center text-6xl">
                📺
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-0 md:pt-36">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
              {tv.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm mb-6">
              <span className="bg-blue-600 px-2.5 py-1 rounded-lg text-xs font-bold uppercase">
                {tv.status || "TV Series"}
              </span>
              {tv.year && <span>{tv.year}</span>}
              <span className="text-gray-600">•</span>
              <span>
                {tv.total_episodes
                  ? `${tv.total_episodes} Episodes`
                  : "N/A Episodes"}
              </span>
              {(tv.ratings?.imdb?.rating || tv.ratings?.simkl?.rating) && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="text-yellow-400 font-bold">
                    ⭐{" "}
                    {tv.ratings?.imdb?.rating || tv.ratings?.simkl?.rating}
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            {tv.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tv.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1.5 bg-zinc-800/80 rounded-full text-xs font-medium hover:bg-blue-600/20 hover:text-blue-400 transition cursor-default border border-zinc-700/50"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <p className="text-gray-400 leading-relaxed max-w-2xl text-sm md:text-base">
              {tv.overview || "No description available."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-3 flex-wrap">
              <button
                onClick={handleAddToWatchList}
                className={`px-8 py-3 rounded-xl font-bold active:scale-95 transition-all flex items-center gap-2 ${
                  isInWatchList
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {isInWatchList ? "✓ In My List" : "+ My List"}
              </button>
              <button
                onClick={handleShare}
                className="bg-zinc-800/60 hover:bg-zinc-700 px-6 py-3 rounded-xl font-medium active:scale-95 transition-all border border-zinc-700/50 flex items-center gap-2 text-sm"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
