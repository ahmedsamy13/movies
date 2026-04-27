import axiosInstance from "./api";

export const getTvDetails = async (tvId) => {
  try {
    const res = await axiosInstance.get(`tv/${tvId}?extended=full`);

    return res.data;
  } catch (error) {
    console.error("Error fetching TV details:", error);
    throw error;
  }
};
