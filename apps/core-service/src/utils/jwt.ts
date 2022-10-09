import jwt, { JsonWebTokenError, SignOptions } from "jsonwebtoken"
import type { User } from "@ference/prisma"

import { SECRET_KEY } from "@/config"

export type UserPayload = Pick<User, "id">

export const signJWT = (payload: UserPayload, options: SignOptions) => {
  const token = jwt.sign(payload, SECRET_KEY, options)
  return token
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload
    return decoded
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      console.error("[Error] JWT JsonWebTokenError")
      console.error(e.message)
    }
    if (e instanceof Error) {
      console.error("[Error] Unexpected Error")
      console.error(e.message)
    }
    return null
  }
}
