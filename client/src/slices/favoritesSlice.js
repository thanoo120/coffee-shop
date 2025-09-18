import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of product objects or IDs
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.items.some(fav => (fav._id || fav) === (action.payload._id || action.payload))) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(fav => (fav._id || fav) !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
