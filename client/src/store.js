import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    user: userReducer,
  },
});

export default store;
