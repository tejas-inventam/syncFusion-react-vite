/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from 'axios'

export interface ApiErrorI {
  status: number | null
  data: unknown | null
  message: string
}

// Common function to handle and structure API errors
export const handleError = (error: AxiosError): ApiErrorI => {
  if (error.response) {
    // Server responded with a status other than 2xx
    return {
      status: error.response.status,
      data: error.response.data,
      message: error.response.statusText
    }
  } else if (error.request) {
    // Request was made but no response was received
    return {
      status: 503,
      data: null,
      message: 'No response received from server'
    }
  } else {
    // Something happened in setting up the request
    return {
      status: null,
      data: null,
      message: error.message
    }
  }
}

export interface ApiSuccessI {
  data: any
}

// Common function to handle API success responses
export const handleSuccess = <T>(response: AxiosResponse<T>): ApiSuccessI => {
  return {
    data: response.data
  }
}
