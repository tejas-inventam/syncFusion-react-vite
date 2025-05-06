import { axiosInstance } from "../libs/axios";
import {
  handleError,
  handleSuccess,
  type ApiErrorI,
  type ApiSuccessI,
} from "./handle-response";

const getAll = (payload: unknown): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/products", { params: payload })
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const add = (payload: unknown): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post("/products/add", payload)
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const update = (ORpayload: {
  id: number;
  payload: unknown;
}): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload;

    axiosInstance
      .patch(`/products/${id}`, payload)
      .then((res) => resolve(handleSuccess(res)))
      .catch((error) => reject(handleError(error)));
  });
};

const deleteById = (id: string) => {
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
