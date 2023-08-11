import axios from 'axios';

export const sendDataToServer = async (petData, formData) => {
  try {
    console.log(process.env.REACT_APP_SERVER_URL);
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}holavet`, {
      petData: petData,
      formData: formData
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to server:", error);
    throw error;
  }
};