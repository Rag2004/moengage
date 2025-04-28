import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async ({ email, password }) => {
  try{
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return {success: true, data: response.data};
  }catch(err){
    console.log(err)
    return {success: false, msg: err.response.data.msg};
  }
};

export const signupUser = async ({ email, password }) => {
  try{
  const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
  return {success: true, data: response.data};
}catch(err){
  console.log(err)
  return {success: false, msg: err.response.data.msg};
}
};
