import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchArchiveData = async () => {
  const response = await axios.get("http://localhost:3000/archive");
  return response.data;
};

export function useArchiveData() {
  return useQuery({
    queryKey: ["archiveData"],
    queryFn: fetchArchiveData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });
}
