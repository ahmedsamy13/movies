import Card from "@/components/ui/card";
import { fetchTrendingTvs } from "@/features/TVs/tvSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tvs() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(fetchTrendingTvs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {data?.map((tvShow) => (
        <Card key={tvShow.ids?.simkl_id ?? tvShow.title} show={tvShow} />
      ))}
    </div>
  );
}
