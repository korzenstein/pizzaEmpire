import axios from "axios";

// Create an Axios instance
const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL 
    : process.env.NEXT_PUBLIC_API_BASE_URL; 

// Create Axios instance
const customAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed (optional)
customAxios.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error); // Reject the promise for error handling
  }
);

export default customAxios;
