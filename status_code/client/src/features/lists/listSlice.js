import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLists, createList, deleteList } from './listAPI';

const initialState = {
  lists: [],
  status: 'idle',
  error: null,
};

export const getLists = createAsyncThunk('lists/getLists', fetchLists);
export const addList = createAsyncThunk('lists/addList', createList);
export const removeList = createAsyncThunk('lists/removeList', deleteList);

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLists.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(list => list._id !== action.payload);
      });
  }
});

export default listSlice.reducer;
