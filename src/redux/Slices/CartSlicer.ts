// import { NewProduct } from "@/components/MediMart/Interface";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { cookies } from 'next/headers'
// // Define the type for the cart items (assuming you have a specific structure)

// interface CartState {
//   cartitems: NewProduct[];
//   cartTotalQuantity: number;
//   cartTotalAmount: number;
// }

// function updateLocalStorage(
//   cartitems: NewProduct[],
//   cartTotalQuantity: number,
//   cartTotalAmount: number
// ) {
//   if (typeof window !== "undefined" && window.localStorage) {
//     localStorage.setItem("cart", JSON.stringify(cartitems));
//     localStorage.setItem(
//       "cartTotalQuantity",
//       JSON.stringify(cartTotalQuantity)
//     );
//     localStorage.setItem("cartTotalAmount", JSON.stringify(cartTotalAmount));
//   }
// }

// const initialState: CartState = {
//   cartitems:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cart") || "[]")
//       : [],
//   cartTotalQuantity:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cartTotalQuantity") || "0")
//       : 0,
//   cartTotalAmount:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cartTotalAmount") || "0")
//       : 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<NewProduct>) => {
//       const existingItem = state.cartitems.find(
//         (item) => item._id === action.payload._id
//       );

//       const itemPrice = Math.ceil(Number(action.payload.price || "0"));
//       // console.log(itemPrice);
      
//       if (existingItem) {
//         existingItem.quantity = (existingItem.quantity || 0) + 1;
//         existingItem.itemCost = (existingItem.itemCost || 0) + itemPrice;
//         state.cartTotalQuantity += 0;
//       } else {
//         const newItem = {
//           ...action.payload,
//           quantity: 1,
//           itemCost: itemPrice,
//         };
//         state.cartitems.push(newItem);
//         state.cartTotalQuantity += 1;
//       }

//       // state.cartTotalQuantity += 1;
//       state.cartTotalAmount += itemPrice;

//       updateLocalStorage(
//         state.cartitems,
//         state.cartTotalQuantity,
//         state.cartTotalAmount
//       );
//     },

//     removeSingleCount: (state, action: PayloadAction<NewProduct>) => {
//       const existingItem = state.cartitems.find(
//         (item) => item._id === action.payload._id
//       );

//       if (existingItem) {
//         const itemPrice = Math.ceil(parseInt(existingItem.price || "0"));

//         if (existingItem.quantity! > 1) {
//           existingItem.quantity!--;
//           existingItem.itemCost = (existingItem.itemCost || 0) - itemPrice;
//         } else {
//           state.cartitems = state.cartitems.filter(
//             (item) => item._id !== action.payload._id
//           );
//           state.cartTotalQuantity -= 1;
//         }

//         state.cartTotalAmount -= itemPrice;

//         updateLocalStorage(
//           state.cartitems,
//           state.cartTotalQuantity,
//           state.cartTotalAmount
//         );
//       }
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const itemIndex = state.cartitems.findIndex(
//         (item) => item._id === action.payload
//       );

//       if (itemIndex >= 0) {
//         const itemToRemove = state.cartitems[itemIndex];
//         const itemTotalCost = itemToRemove.itemCost || 0;

//         state.cartTotalQuantity -= itemToRemove.quantity!;
//         state.cartTotalAmount -= itemTotalCost;

//         state.cartitems.splice(itemIndex, 1);

//         updateLocalStorage(
//           state.cartitems,
//           state.cartTotalQuantity,
//           state.cartTotalAmount
//         );
//       }
//     },

//     clearCart: (state) => {
//       state.cartitems = [];
//       state.cartTotalAmount = 0;
//       state.cartTotalQuantity = 0;

//       if (typeof window !== "undefined" && window.localStorage) {
//         localStorage.removeItem("cart");
//         localStorage.removeItem("cartTotalQuantity");
//         localStorage.removeItem("cartTotalAmount");
//       }
//     },
//   },
// });

// // Export the actions to use in components
// export const { addToCart, removeFromCart, removeSingleCount, clearCart } =
//   cartSlice.actions;

// // Export the reducer to include in the store
// export default cartSlice.reducer;
import { NewProduct } from "@/components/MediMart/Interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
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

const updateLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.cartitems));
    localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity));
    localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
  }
};

const initialState: CartState = {
  cartitems: getLocalStorageItem<NewProduct[]>("cart", []),
  cartTotalQuantity: getLocalStorageItem<number>("cartTotalQuantity", 0),
  cartTotalAmount: getLocalStorageItem<number>("cartTotalAmount", 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<NewProduct>) => {
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

    removeSingleCount: (state, action: PayloadAction<NewProduct>) => {
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

    removeFromCart: (state, action: PayloadAction<string>) => {
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

    clearCart: (state) => {
      state.cartitems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTotalQuantity");
        localStorage.removeItem("cartTotalAmount");
      }
    },
  },
});

export const { addToCart, removeFromCart, removeSingleCount, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;