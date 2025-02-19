import { createSlice } from "@reduxjs/toolkit";

// Safely retrieve cart data from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
    }
};

const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let time = action.payload.time;
            
            // Check if time has toMillis function (i.e., is Firestore Timestamp)
            if (time && typeof time.toMillis === "function") {
                time = time.toMillis();
            } else if (typeof time !== "number") {
                time = Date.now(); // Fallback if time is undefined or not a number
            }

            return [...state, { ...action.payload, time }];
        },
        deleteFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            return state.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
        },
        decrementQuantity: (state, action) => {
            return state.map((item) =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        },
    },
});

// Export actions
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
