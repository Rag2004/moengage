import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser } from './authAPI';

const token = localStorage.getItem('token');

const initialState = {
  user: token ? { token } : null,
  status: 'idle',
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
    setToken(state, actions) {
      state.user = actions.payload,
      localStorage.setItem('token',actions.payload)
    }
  },
  
});

export const { logout , setToken} = authSlice.actions;
export default authSlice.reducer;
