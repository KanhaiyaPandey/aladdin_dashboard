import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicFetch, customFetch } from "../../utils/Helpers";

// Async thunks for API calls
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicFetch.get("/category/all-categories");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await customFetch.post(
        "/category/create-category",
        categoryData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
          error.response?.data?.message ||
          "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await customFetch.put(
        `/category/update-category/${id}`,
        categoryData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
          error.response?.data?.message ||
          "Failed to update category"
      );
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (categoryIds, { rejectWithValue }) => {
    try {
      await customFetch.delete("/category/delete-categories", {
        data: { categoryIds },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return categoryIds;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete categories"
      );
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
  lastFetched: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categories = [];
      state.lastFetched = null;
    },
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Add new category to the list
        state.categories.push(action.payload);
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat.categoryId === action.payload.categoryId
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete categories
      .addCase(deleteCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.categories = state.categories.filter(
          (cat) => !deletedIds.includes(cat.categoryId)
        );
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategories, invalidateCache } = categorySlice.actions;

// Selectors
export const selectCategories = (state) => state.categoryState.categories;
export const selectCategoriesLoading = (state) => state.categoryState.loading;
export const selectCategoriesError = (state) => state.categoryState.error;
export const selectCategoriesCacheValid = (state) => {
  const { lastFetched, cacheExpiry } = state.categoryState;
  if (!lastFetched) return false;
  return Date.now() - lastFetched < cacheExpiry;
};

export default categorySlice.reducer;

