import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTv, fetchTvById } from "@/features/TVs/tvSlice";
import { addItem } from "@/features/watchList/watchListSlice";
export default function Tv() {
  const { serieId } = useParams(); // جبنا الـ ID من الرابط
  const dispatch = useDispatch();

  const { selectedTv: tv, loading, error } = useSelector((state) => state.tv);

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
    const newSerie = {
      id: serieId,
      rating: tv.ratings?.simkl?.rating,
      poster: `https://simkl.in/posters/${tv.poster}_m.jpg`,
      year: tv.year,
    };
    dispatch(addItem(newSerie));
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !tv) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-500">TV Show not found</h2>
        <Link to="/series" className="text-blue-500 hover:underline">
          Back to TV Shows
        </Link>
      </div>
    );
  }

  const posterUrl = `https://simkl.in/posters/${tv.poster}_m.jpg`;
  const fanartUrl = `https://simkl.in/fanart/${tv.fanart}_p.jpg`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Hero */}
      <div className="relative h-[300px] md:h-[500px] w-full overflow-hidden">
        <img
          src={fanartUrl}
          className="w-full h-full object-cover scale-110 opacity-40"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <Link
          to="/series"
          className="absolute top-6 left-6 bg-black/60 backdrop-blur-md hover:bg-blue-600 px-4 py-2 rounded-full transition z-20"
        >
          ← Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          {/* Poster */}
          <div className="w-36 md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={posterUrl}
              className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:scale-105 transition duration-500"
              alt={tv.title}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-0 md:pt-36">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight">
              {tv.title}
            </h1>

            {/* Meta Data (مخصصة للمسلسلات) */}
            <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm mb-6">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs font-bold uppercase">
                {tv.status || "TV Series"}
              </span>
              <span>{tv.year}</span>
              <span className="text-gray-600">•</span>
              <span>
                {tv.total_episodes
                  ? `${tv.total_episodes} Episodes`
                  : "N/A Episodes"}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-yellow-400 font-bold">
                ⭐ {tv.ratings?.simkl?.rating || "0.0"}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tv.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-xs hover:bg-blue-600 transition cursor-default"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-400 leading-relaxed max-w-2xl text-sm md:text-base">
              {tv.overview || "No description available."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToWatchList}
                className="bg-zinc-800 px-8 py-3 rounded-xl font-bold hover:bg-zinc-700 active:scale-95 transition"
              >
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
