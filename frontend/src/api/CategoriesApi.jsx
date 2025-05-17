import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const GetCategoriesApi = async () => {
  try {
    const response = await axios.get(`http://${API_URL}/api/v1/categories`);

    return response.data;
  } catch (error) {
    console.error;
  }
};

export const CreateCategoriesApi = async (title) => {
  try {
    const response = await axios.post(`http://${API_URL}/api/v1/categories`, {
      title: title,
    });

    return response.data;
  } catch (error) {
    console.error;
  }
};
