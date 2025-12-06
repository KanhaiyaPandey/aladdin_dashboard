import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch, publicFetch } from "../../utils/Helpers";

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicFetch.get("/product/all-products");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await publicFetch.get(`/product/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await customFetch.post(
        "/product/create-product",
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await customFetch.put(
        `/product/update-product/${id}`,
        productData
      );
      return { id, data: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await customFetch.delete(`/product/delete-product/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  lastFetched: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.currentProduct = null;
      state.lastFetched = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Invalidate cache to refetch products list
        state.lastFetched = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { id, data } = action.payload;
        const index = state.products.findIndex(
          (prod) => prod.productId === id || prod._id === id
        );
        if (index !== -1) {
          state.products[index] = data;
        }
        if (state.currentProduct && (state.currentProduct.productId === id || state.currentProduct._id === id)) {
          state.currentProduct = data;
        }
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (prod) => prod.productId !== action.payload && prod._id !== action.payload
        );
        if (state.currentProduct && (state.currentProduct.productId === action.payload || state.currentProduct._id === action.payload)) {
          state.currentProduct = null;
        }
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProducts, setCurrentProduct, invalidateCache } =
  productSlice.actions;

// Selectors
export const selectProducts = (state) => state.productState.products;
export const selectCurrentProduct = (state) => state.productState.currentProduct;
export const selectProductsLoading = (state) => state.productState.loading;
export const selectProductsError = (state) => state.productState.error;
export const selectProductsCacheValid = (state) => {
  const { lastFetched, cacheExpiry } = state.productState;
  if (!lastFetched) return false;
  return Date.now() - lastFetched < cacheExpiry;
};

export default productSlice.reducer;

