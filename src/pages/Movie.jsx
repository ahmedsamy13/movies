import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieById,
  clearSelectedMovie,
} from "@/features/movies/movieSlice";

export default function Movie() {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  // استدعاء البيانات من الـ Redux Store
  const {
    selectedMovie: movie,
    loading,
    error,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }

    // تنظيف البيانات عند مغادرة الصفحة لضمان عدم ظهور فيلم قديم عند العودة
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, movieId]);

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // حالة وجود خطأ أو عدم العثور على الفيلم
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-500">Movie not found</h2>
        <Link to="/movies" className="text-blue-500 hover:underline">
          Back to Movies
        </Link>
      </div>
    );
  }

  // روابط الصور من Simkl
  const posterUrl = `https://simkl.in/posters/${movie.poster}_m.jpg`;
  const fanartUrl = `https://simkl.in/fanart/${movie.fanart}_p.jpg`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <img
          src={fanartUrl}
          className="w-full h-full object-cover opacity-20 blur-md scale-110"
          alt="background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>

        <Link
          to="/movies"
          className="absolute top-6 left-6 bg-black/50 hover:bg-blue-600 p-3 rounded-full transition-all z-20 group"
        >
          <span className="flex items-center gap-2 text-sm font-bold">
            ← Back
          </span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <img
              src={posterUrl}
              className="w-full rounded-2xl shadow-2xl border border-zinc-800 transform transition hover:scale-105 duration-500"
              alt={movie.title}
            />
          </div>

          {/* Movie Details Info */}
          <div className="flex-1 pt-10 md:pt-44">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-6">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-black text-[10px]">
                4K ULTRA HD
              </span>
              <span className="font-bold">{movie.year}</span>
              <span>•</span>
              <span>{movie.runtime || "N/A"} min</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-yellow-500">
                ⭐{" "}
                <span className="font-black text-white">
                  {movie.ratings?.simkl?.rating || "0.0"}
                </span>
              </div>
            </div>

            {/* Genres Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {movie.genres?.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-gray-300 hover:border-blue-500 hover:text-white transition"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-3 text-blue-500 uppercase tracking-widest">
              Overview
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl font-medium">
              {movie.overview || "No description available for this title."}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5">
                WATCH NOW
              </button>
              <button className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black border border-zinc-800 hover:bg-zinc-800 transition-all">
                ADD TO LIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
