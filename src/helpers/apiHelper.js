import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080/api/holavet';

export const sendDataToServer = async (petData, formData) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      petData: petData,
      formData: formData
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};