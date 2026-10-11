import { NewProduct } from "@/components/MediMart/Interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleCartState {
  cartitems: NewProduct[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

// Helper function to safely parse localStorage items
const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return defaultValue;
  }
};

const updateLocalStorage = (state: SingleCartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("singlecart", JSON.stringify(state.cartitems));
    localStorage.setItem(
      "singlecartTotalQuantity",
      JSON.stringify(state.cartTotalQuantity)
    );
    localStorage.setItem(
      "singlecartTotalAmount",
      JSON.stringify(state.cartTotalAmount)
    );
  }
};

const initialState: SingleCartState = {
  cartitems: getLocalStorageItem<NewProduct[]>("singlecart", []),
  cartTotalQuantity: getLocalStorageItem<number>("singlecartTotalQuantity", 0),
  cartTotalAmount: getLocalStorageItem<number>("singlecartTotalAmount", 0),
};

const singleCartSlice = createSlice({
  name: "singlecart",
  initialState,
  reducers: {
    singleaddToCart: (state, action: PayloadAction<NewProduct>) => {
      const existingItem = state.cartitems.find(
        (item) => item._id === action.payload._id
      );

      const itemPrice = Number(action.payload.price) || 0;

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.itemCost = (existingItem.itemCost || 0) + itemPrice;
      } else {
        state.cartitems.push({
          ...action.payload,
          quantity: 1,
          itemCost: itemPrice,
        });
        state.cartTotalQuantity += 1;
      }

      state.cartTotalAmount += itemPrice;
      updateLocalStorage(state);
    },

    singleremoveSingleCount: (state, action: PayloadAction<NewProduct>) => {
      const existingItem = state.cartitems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        const itemPrice = Number(existingItem.price) || 0;

        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.itemCost = (existingItem.itemCost || 0) - itemPrice;
        } else {
          state.cartitems = state.cartitems.filter(
            (item) => item._id !== action.payload._id
          );
          state.cartTotalQuantity -= 1;
        }

        state.cartTotalAmount -= itemPrice;
        updateLocalStorage(state);
      }
    },

    singleremoveFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.cartitems.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {
        const itemToRemove = state.cartitems[itemIndex];
        const itemTotalCost = itemToRemove.itemCost || 0;

        state.cartTotalQuantity -= itemToRemove.quantity || 0;
        state.cartTotalAmount -= itemTotalCost;
        state.cartitems.splice(itemIndex, 1);
        updateLocalStorage(state);
      }
    },

    singleclearCart: (state) => {
      state.cartitems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("singlecart");
        localStorage.removeItem("singlecartTotalQuantity");
        localStorage.removeItem("singlecartTotalAmount");
      }
    },
  },
});

export const {
  singleaddToCart,
  singleremoveFromCart,
  singleremoveSingleCount,
  singleclearCart,
} = singleCartSlice.actions;

export default singleCartSlice.reducer;
