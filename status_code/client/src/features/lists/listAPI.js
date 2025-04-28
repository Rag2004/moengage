import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: { Authorization: localStorage.getItem('token') }
});

export const fetchLists = async () => {
  try {
    const response = await axios.get(`${API_URL}/lists`, getAuthHeader());
    return response.data;
  } catch (err) {
    console.log(err)
    return { success: false, msg: err.response.data.msg };
  }
};

export const createList = async ({ name, code }) => {
  try {
    const response = await axios.post(`${API_URL}/lists`, { name, code }, getAuthHeader());
    return response.data;
  } catch (err) {
    console.log(err)
    return { success: false, msg: err.response.data.msg };
  }
};

export const deleteList = async (id) => {
  try {
    await axios.delete(`${API_URL}/lists/${id}`, getAuthHeader());
    return id;
  } catch (err) {
    console.log(err)
    return { success: false, msg: err.response.data.msg };
  }
};
