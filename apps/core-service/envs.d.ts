declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string
    SECRET_KEY: string

    LOG_DIR?: string
    LOG_FORMAT?: string

    ORIGIN?: string
    SITE_HOST: string

    SENDGRID_FROM: string
    SENDGRID_API_KEY: string

    REDIS_URL: string
  }
}
