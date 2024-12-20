import customAxios from "@/app/utils/customAxios";

export const goFundMe = async (playerID) => {
  try {
    const response = await customAxios.post(`/players/${playerID}/goFundMe`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Failed to activate goFundMe:", error);
    // Throw a detailed error to handle it better in the caller
    throw error.response?.data?.error || "An unexpected error occurred while activating Go Fund Me.";
  }
};
