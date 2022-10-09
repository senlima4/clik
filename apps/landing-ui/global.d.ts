declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    REDIS_URL: string
    SENDGRID_FROM: string
    SENDGRID_API_KEY: string
    JWT_SECRET: string
  }
}
