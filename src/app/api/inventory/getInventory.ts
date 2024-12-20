import customAxios from "@/app/utils/customAxios";

export const getInventory = async (playerID: number) => {
  if (!playerID) {
    throw new Error("Player ID is required to fetch inventory.");
  }

  try {
    const { data } = await customAxios.get(`/inventory/${playerID}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    throw error;
  }
};