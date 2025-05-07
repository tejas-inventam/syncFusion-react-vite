import { axiosInstance } from "../libs/axios";
import type { GetData } from "../types/getData";
import type { Product, UpdateProduct } from "../types/product";
import {
  handleError,
  handleSuccess,
  type ApiErrorI,
  type ApiSuccessI,
} from "./handle-response";

const getAll = (payload: GetData): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/products", { params: payload })
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const add = (payload: Partial<Product>): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/products/add", payload)
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const update = (ORpayload: UpdateProduct): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload;

    axiosInstance
      .patch(`/products/${id}`, payload)
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const deleteById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/products/${id}`)
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const productService = {
  getAll,
  add,
  update,
  deleteById,
};

export default productService;
