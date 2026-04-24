import axiosInstance from "./api";

export const getMovieDetails = async (movieId) => {
  try {
    const res = await axiosInstance.get(`movies/${movieId}?extended=full`);
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
