import hpp from "hpp"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import express from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import isEmpty from "lodash/isEmpty"

import { NODE_ENV, PORT, LOG_FORMAT, CORS_OPTIONS } from "@/config"
import errorMiddleware from "@/middlewares/error.middleware"
import { logger, stream } from "@utils/logger"
import type { RouterItem } from "@/types"

type CreateAppParams = {
  routes: RouterItem[]
}

export const createApp = ({ routes }: CreateAppParams) => {
  const app = express()

  app.use(morgan(LOG_FORMAT || "dev", { stream }))
  app.use(cors(CORS_OPTIONS))
  app.use(hpp())
  app.use(helmet())
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())

  if (!isEmpty(routes)) {
    routes.forEach((route) => {
      app.use(route.prefix, route.router)
    })
  }

  app.use(errorMiddleware)

  const listen = () => {
    app.listen(PORT || 3456, () => {
      logger.info(`=================================`)
      logger.info(`======= ENV: ${NODE_ENV} =======`)
      logger.info(`🚀 App listening on the port ${PORT}`)
      logger.info(`=================================`)
    })
  }

  return {
    listen,
  }
}
