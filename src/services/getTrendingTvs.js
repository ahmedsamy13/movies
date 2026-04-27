import axiosInstance from "./api";

export async function getTrendingTvs() {
  try {
    const res = await axiosInstance.get("tv/trending?extended=full");
    return res.data;
  } catch (error) {
    console.error("Error fetching trending tv:", error);
    throw error;
  }
}
