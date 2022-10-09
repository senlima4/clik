import { logger } from "@/utils/logger"
import type { ErrorHandler } from "@/types"

const DEFAULT_ERROR_CODE = 500
const DEFAULT_ERROR_MESSAGE = "unexpected error"

const errorMiddleware: ErrorHandler = (error, req, res, next) => {
  try {
    const status: number = error.status || DEFAULT_ERROR_CODE
    const message: string = error.message || DEFAULT_ERROR_MESSAGE

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    res.status(status).json({ message })
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware
