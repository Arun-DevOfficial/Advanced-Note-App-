import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../Services/supabaseClient"; // Ensure this points to your actual Supabase client file

// Check if user exists
export const useCheckUserExists = (phone) => {
  return useQuery({
    queryKey: ["checkUserExists", phone],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users") // Replace with your actual table name in Supabase
        .select("*")
        .eq("phone", phone);

      if (error) throw new Error(error.message);
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
      const { data, error } = await supabase.from("users").insert(user);
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

// Fetch users data
export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["fetchUsers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users") // Replace with your actual table name in Supabase
        .select("*");

      if (error) throw new Error(error.message);
      return data; // Returns the fetched users data
    },
    staleTime: 1000 * 60 * 5, // Set stale time to 5 minutes (optional)
    retry: false, // Avoid retrying to reduce redundant calls
  });
};
