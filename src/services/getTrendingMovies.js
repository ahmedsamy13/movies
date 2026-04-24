import axiosInstance from "./api";

export async function getTrendingMovies() {
  try {
    const res = await axiosInstance.get("movies/trending?extended=full");
    return res.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
}
