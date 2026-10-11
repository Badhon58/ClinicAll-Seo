import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LabCart {
  _id?: string;
  name?: string;
  category?: string;
  mrp?: number;
  image?: string;
  quantity?: number;
  itemCost?: number;
  provider?: string;
  checked?: boolean;
}

interface LabState {
  labitems: LabCart[];
  insideDhaka: LabCart[];
  outsideDhaka: LabCart[];
  labTotalQuantity: number;
  labTotalAmount: number;
  provider: string;
}

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

const updateLocalStorage = (state: LabState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("labItems", JSON.stringify(state.labitems));
    localStorage.setItem(
      "labTotalQuantity",
      JSON.stringify(state.labTotalQuantity)
    );
    localStorage.setItem(
      "labTotalAmount",
      JSON.stringify(state.labTotalAmount)
    );
    localStorage.setItem("outsideDhaka", JSON.stringify(state.outsideDhaka));
    localStorage.setItem("insideDhaka", JSON.stringify(state.insideDhaka));
    localStorage.setItem("provider", JSON.stringify(state.provider));
  }
};

const initialState: LabState = {
  labitems: getLocalStorageItem<LabCart[]>("labItems", []),
  insideDhaka: getLocalStorageItem<LabCart[]>("insideDhaka", []),
  outsideDhaka: getLocalStorageItem<LabCart[]>("outsideDhaka", []),
  labTotalQuantity: getLocalStorageItem<number>("labTotalQuantity", 0),
  labTotalAmount: getLocalStorageItem<number>("labTotalAmount", 0),
  provider:
    typeof window !== "undefined"
      ? localStorage.getItem("location") || "insidedhaka"
      : "insidedhaka",
};

const labSlice = createSlice({
  name: "Lab",
  initialState,
  reducers: {
    addToLab: (state, action: PayloadAction<LabCart>) => {
      const existingItem = state.labitems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        const newItem = {
          ...action.payload,
          quantity: 1,
          itemCost: action.payload.mrp || 0,
          checked: true,
        };
        // console.log("action",action);

        if (action.payload.provider == "Probe") {
          state.outsideDhaka.push(newItem);
        } else {
          state.insideDhaka.push(newItem);
        }
        state.labitems.push(newItem);
        state.labTotalQuantity += 1;
        state.labTotalAmount += newItem.itemCost;
        updateLocalStorage(state);
      }
    },

    removeFromLab: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.labitems.find((item) => item._id === itemId);

      if (existingItem) {
        state.labitems = state.labitems.filter((item) => item._id !== itemId);
        state.insideDhaka = state.insideDhaka.filter(
          (item) => item._id !== itemId
        );
        state.outsideDhaka = state.outsideDhaka.filter(
          (item) => item._id !== itemId
        );
        state.labTotalQuantity -= 1;
        state.labTotalAmount -= existingItem.itemCost || 0;
        updateLocalStorage(state);
      }
    },

    clearLab: (state) => {
      state.labitems = [];
      state.labTotalAmount = 0;
      state.labTotalQuantity = 0;
      state.insideDhaka = [];
      state.outsideDhaka = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("labItems");
        localStorage.removeItem("labTotalQuantity");
        localStorage.removeItem("labTotalAmount");
        localStorage.removeItem("newlabitems");
        localStorage.removeItem("insideDhaka");
        localStorage.removeItem("outsideDhaka");
      }
    },

    removeSingleCount: (state, action: PayloadAction<LabCart>) => {
      const existingItem = state.labitems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        const itemPrice = existingItem.mrp || 0;

        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.itemCost = (existingItem.itemCost || 0) - itemPrice;
        } else {
          state.labitems = state.labitems.filter(
            (item) => item._id !== action.payload._id
          );
          state.labTotalQuantity -= 1;
        }

        state.labTotalAmount -= itemPrice;
        updateLocalStorage(state);
      }
    },
    chagedProdived: (state, action: PayloadAction<string>) => {
      state.provider = action.payload;
    },
    toggleChecked: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      // Update in labitems
      const existingItem = state.labitems.find((item) => item._id === itemId);
      if (existingItem) {
        existingItem.checked = !existingItem.checked;
      }

      // Update insideDhaka
      state.insideDhaka = state.insideDhaka.map((item) =>
        item._id === itemId ? { ...item, checked: !item.checked } : item
      );

      // Update outsideDhaka
      state.outsideDhaka = state.outsideDhaka.map((item) =>
        item._id === itemId ? { ...item, checked: !item.checked } : item
      );

      // Recalculate totals based on only checked items
      const allItems = [...state.insideDhaka, ...state.outsideDhaka];
      state.labTotalAmount = allItems.reduce(
        (acc, item) => (item.checked ? acc + (item.itemCost || 0) : acc),
        0
      );

      updateLocalStorage(state);
    },
  },
});

export const {
  addToLab,
  removeFromLab,
  clearLab,
  removeSingleCount,
  chagedProdived,
  toggleChecked,
} = labSlice.actions;

export default labSlice.reducer;
