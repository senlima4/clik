import { config } from "dotenv"
import type { CorsOptions } from "cors"
import type { CookieSerializeOptions } from "cookie"

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` })

export const CREDENTIALS = process.env.CREDENTIALS === "true"

export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN = "*",
  SITE_HOST,
  SENDGRID_FROM,
  SENDGRID_API_KEY,
  REDIS_URL,
} = process.env

export const isDev = NODE_ENV === "development"
export const isProd = NODE_ENV === "production"

export const TEST_CODE = "111111"

export const DEFAULT_COOKIE_OPTIONS: CookieSerializeOptions = {
  path: "/",
  secure: isProd,
  sameSite: "lax",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
}

export const CORS_OPTIONS: CorsOptions = {
  origin: ORIGIN === "*" ? ORIGIN : ORIGIN.split(","),
  credentials: true,
}
