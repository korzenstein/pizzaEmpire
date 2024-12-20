import customAxios from "@/app/utils/customAxios";

// Buy more inventory for a player
export const buyIngredient = async (playerID: number, ingredient: string, cost: number) => {
  try {
     const { data } = await customAxios.post(`/inventory/${playerID}/buy`, {
      ingredient,
      cost,
    });
    return data;
  } catch (error) {
    console.error("Failed to buy ingredient:", error);
    throw error;
  }
};
