import axios from "axios";

// Create an Axios instance
const customAxios = axios.create({
  baseURL: "http://localhost:3001", 
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
