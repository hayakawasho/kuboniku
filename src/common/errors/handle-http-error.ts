import axios from "axios"
import { HttpException } from "./error"

const handleHttpError = (error: unknown) => {
  if (error instanceof HttpException) {
    return error
  }

  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 500:
        return new HttpException("UNKNOWN", error.message)
      case 404:
        return new HttpException("NOT_FOUND", error.message)
    }
  }

  return new HttpException(
    "UNEXPECTED",
    "Oops, an unexpected error has occurred."
  )
}

export { handleHttpError }
