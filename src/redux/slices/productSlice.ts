import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'
import type { ApiSuccessI } from '../../service/handle-response'
import productService from '../../service/productService'
import type { Product, UpdateProduct } from '../../types/product'
import type { GetData } from '../../types/getData'

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (payload: GetData, { rejectWithValue }) => {
    try {
      const { data }: ApiSuccessI = await productService.getAll(payload)

      return {
        list: Array.isArray(data.products) ? data.products : [],
        rowCount: data.total
      }
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (payload: Partial<Product>, { rejectWithValue }) => {
    try {
      const res: ApiSuccessI = await productService.add(payload)

      return res
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (payload: UpdateProduct, { rejectWithValue }) => {
    try {
      const res: ApiSuccessI = await productService.update(payload)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string, { rejectWithValue }) => {
  try {
    const res = await productService.deleteById(id)

    return res.data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

interface ProductStateI {
  loading: boolean
  products: Product[]
  rowCount: number
}

const initialState: ProductStateI = {
  loading: false,
  products: [],
  rowCount: 0
}

const productSlice = createAppSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    },
    setProduct: (state, { payload }: PayloadAction<Product>) => {
      state.products = [...state.products, payload]
    }
  },
  extraReducers: builder => {
    // get all products
    builder.addCase(getAllProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, { payload: { list, rowCount } }) => {
      state.products = Array.isArray(list) ? list : []
      state.loading = false
      state.rowCount = rowCount
    })
    builder.addCase(getAllProducts.rejected, state => {
      state.loading = false
    })

    // update product
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.products = state.products.map(product => (product.id === payload.id ? payload : product))
    })

    // delete product
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products = state.products.filter(product => product.id !== payload.id)
    })
  }
})

export const productActions = productSlice.actions

export default productSlice.reducer
