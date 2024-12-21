import customAxios from "@/app/utils/customAxios";

export const goFundMe = async (playerID: number) => {
  try {
    const response = await customAxios.post(`/players/${playerID}/goFundMe`);
    return response.data; 
  } catch (error) {
    console.error("Failed to activate goFundMe:", error);
    throw error || "An unexpected error occurred while activating Go Fund Me.";
  }
};
