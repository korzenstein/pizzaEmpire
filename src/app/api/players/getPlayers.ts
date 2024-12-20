import customAxios from "@/app/utils/customAxios";

// Fetch all players
export const getPlayers = async () => {
  try {
    const { data } = await customAxios.get(`/players`);
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
};
