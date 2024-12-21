import customAxios from "@/app/utils/customAxios";

// Buy more inventory for a player
export const buyIngredient = async (playerID: number, ingredient: string,) => {
  try {
     const { data } = await customAxios.post(`/inventory/${playerID}/buy`, {
      ingredient,
    });
    return data;
  } catch (error) {
    console.error("Failed to buy ingredient:", error);
    throw error;
  }
};
