import { configureStore } from "@reduxjs/toolkit";

import userReducer from './assets/features/userSlice'
import categoryReducer from './assets/features/categorySlice'
import productReducer from './assets/features/productSlice'
import warehouseReducer from './assets/features/warehouseSlice'

export const store = configureStore({
  reducer: {
    userState: userReducer,
    categoryState: categoryReducer,
    productState: productReducer,
    warehouseState: warehouseReducer,
  },
});