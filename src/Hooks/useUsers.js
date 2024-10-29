// useUsers.js
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// API Base URL
const API_URL = "https://6720578ce7a5792f05312cf3.mockapi.io/api/v1/users";

// Check if user exists
export const useCheckUserExists = (phone) => {
  return useQuery({
    queryKey: ["checkUserExists", phone],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?phone=${phone}`);
      return data.length > 0; // Returns true if user exists
    },
    enabled: !!phone, // Runs only if phone has a value
    retry: false, // Avoid retrying to reduce redundant calls
  });
};

// Register new user
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.post(API_URL, user);
      return data;
    },
  });
};
