import Card from "@/components/ui/card";
import { fetchTrendingMovies } from "@/features/movies/movieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);
  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 ">
      {data.map((movie) => (
        <Card key={movie.ids?.simkl_id ?? movie.title} show={movie} />
      ))}
    </div>
  );
}
