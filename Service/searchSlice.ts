import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  avatar_url: string;
  login: string;
  type: string;
}

interface SearchState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'search/fetchUsers',
  async (login: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${login}+in:login`,
      );
      console.log('API Response:', response.data.items);
      return response.data.items;
    } catch (error: any) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

export default searchSlice.reducer;
