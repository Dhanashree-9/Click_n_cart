import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import the reducer correctly

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Use `cartSlice.reducer` (default export)
  },
});