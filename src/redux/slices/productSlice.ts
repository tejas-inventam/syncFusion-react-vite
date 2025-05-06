/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import type { ApiSuccessI } from "../../service/handle-response";
import productService from "../../service/productService";
import type { Product } from "../../types/product";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (payload: unknown, { rejectWithValue }) => {
    try {
      const { data }: ApiSuccessI = await productService.getAll(payload);

      return {
        list: Array.isArray(data.products) ? data.products : [],
        rowCount: data.total,
      };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (payload: unknown, { rejectWithValue }) => {
    try {
      const res: ApiSuccessI = await productService.add(payload);

      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res: ApiSuccessI = await productService.update(payload);
      return res.data; // assuming res.data contains the updated product
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await productService.deleteById(id);

      return res;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

interface ProductStateI {
  loading: boolean;
  products: Product[];
  rowCount: number;
}

const initialState: ProductStateI = {
  loading: false,
  products: [],
  rowCount: 0,
};

const productSlice = createAppSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    resetState: () => {
      return { ...initialState };
    },
    setProduct: (state, { payload }: PayloadAction<Product>) => {
      state.products = [...state.products, payload];
    },
    updateProduct: (state, { payload }: PayloadAction<Product>) => {
      state.products = state.products.map((product) =>
        product.id === payload.id ? payload : product
      );
    },
    deleteProduct: (state, { payload }: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    // get all products
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state, { payload: { list, rowCount } }) => {
        state.products = Array.isArray(list) ? list : [];
        state.loading = false;
        state.rowCount = rowCount;
      }
    );
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
