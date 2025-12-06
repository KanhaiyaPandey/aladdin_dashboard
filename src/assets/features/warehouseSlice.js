import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/Helpers";

// Async thunks for API calls
export const fetchWarehouses = createAsyncThunk(
  "warehouses/fetchWarehouses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customFetch.get("/warehouse/all");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch warehouses"
      );
    }
  }
);

export const createWarehouse = createAsyncThunk(
  "warehouses/createWarehouse",
  async (warehouseData, { rejectWithValue }) => {
    try {
      const response = await customFetch.post(
        "/warehouse/create",
        warehouseData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create warehouse"
      );
    }
  }
);

export const updateWarehouse = createAsyncThunk(
  "warehouses/updateWarehouse",
  async ({ id, warehouseData }, { rejectWithValue }) => {
    try {
      const response = await customFetch.put(
        `/warehouse/update/${id}`,
        warehouseData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update warehouse"
      );
    }
  }
);

export const deleteWarehouse = createAsyncThunk(
  "warehouses/deleteWarehouse",
  async (warehouseId, { rejectWithValue }) => {
    try {
      await customFetch.delete(`/warehouse/delete/${warehouseId}`);
      return warehouseId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete warehouse"
      );
    }
  }
);

const initialState = {
  warehouses: [],
  loading: false,
  error: null,
  lastFetched: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
};

const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    clearWarehouses: (state) => {
      state.warehouses = [];
      state.lastFetched = null;
    },
    invalidateCache: (state) => {
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch warehouses
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create warehouse
      .addCase(createWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses.push(action.payload);
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update warehouse
      .addCase(updateWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.warehouses.findIndex(
          (wh) => wh.warehouseId === action.payload.warehouseId
        );
        if (index !== -1) {
          state.warehouses[index] = action.payload;
        }
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete warehouse
      .addCase(deleteWarehouse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = state.warehouses.filter(
          (wh) => wh.warehouseId !== action.payload
        );
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWarehouses, invalidateCache } = warehouseSlice.actions;

// Selectors
export const selectWarehouses = (state) => state.warehouseState.warehouses;
export const selectWarehousesLoading = (state) => state.warehouseState.loading;
export const selectWarehousesError = (state) => state.warehouseState.error;
export const selectWarehousesCacheValid = (state) => {
  const { lastFetched, cacheExpiry } = state.warehouseState;
  if (!lastFetched) return false;
  return Date.now() - lastFetched < cacheExpiry;
};

export default warehouseSlice.reducer;

