import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const GetMemoByCategoryId = async (id) => {
  try {
    const response = await axios.get(
      `http://${API_URL}/api/v1/memo/search?category_id=${id}`
    );

    return response.data;
  } catch (error) {
    console.error;
  }
};

export const GetMemoById = async (id) => {
  try {
    const response = await axios.get(`http://${API_URL}/api/v1/memo/${id}`);

    return response.data;
  } catch (error) {
    console.error;
  }
};

export const CreateMemo = async (data) => {
  try {
    const response = await axios.post(`http://${API_URL}/api/v1/memo/`, {
      title: data.title,
      content: data.content,
      category_id: data.category_id,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMemo = async (data) => {
  try {
    const response = await axios.put(
      `http://${API_URL}/api/v1/memo/${data.id}`,
      {
        content: data.content,
        title: data.title,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
