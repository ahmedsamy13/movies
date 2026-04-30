import axiosInstance from "./api";

const search = async (query) => {
  if (!query.trim()) return [];

  try {
    const [movies, shows, anime] = await Promise.all([
      axiosInstance.get("/search/movie", {
        params: {
          q: query,
          limit: 10,
          client_id: import.meta.env.VITE_SIMKL_API_KEY,
        },
      }),
      axiosInstance.get("/search/tv", {
        params: {
          q: query,
          limit: 10,
          client_id: import.meta.env.VITE_SIMKL_API_KEY,
        },
      }),
      axiosInstance.get("/search/anime", {
        params: {
          q: query,
          limit: 10,
          client_id: import.meta.env.VITE_SIMKL_API_KEY,
        },
      }),
    ]);

    const moviesData = Array.isArray(movies.data) ? movies.data : [];
    const showsData = Array.isArray(shows.data) ? shows.data : [];
    const animeData = Array.isArray(anime.data) ? anime.data : [];

    const combined = [
      ...moviesData.map((i) => ({ ...i, type: "movie" })),
      ...showsData.map((i) => ({ ...i, type: "tv" })),
      ...animeData.map((i) => ({ ...i, type: "anime" })),
    ];

    return combined.filter((i) => i.title);
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

export default search;
