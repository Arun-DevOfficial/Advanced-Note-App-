import axios from "axios";
import { API_URL } from "../utils/URL";

export const checkUserExists = async (phone) => {
  const response = await axios.get(`${API_URL}?phone=${phone}`);
  return response.data.length > 0; // true if user exists
};

export const registerUser = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
