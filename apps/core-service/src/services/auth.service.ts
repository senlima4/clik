import cookie from "cookie"
import { prisma } from "@ference/prisma"
import { ResponseError } from "@sendgrid/mail"

import redis from "@utils/redis"
import { signJWT } from "@utils/jwt"
import { sendVerifyCode } from "@utils/send-grid"
import { generateOTP, getOTP } from "@/utils/crypto"
import { HttpException } from "@exceptions/HttpException"
import { isProd, DEFAULT_COOKIE_OPTIONS } from "@config"

export type RequestCodeParams = {
  email: string
}

export type VerifyCodeParam = {
  code: string
  email: string
}

interface IAuthService {
  requestCode: (params: RequestCodeParams) => Promise<any>
  verifyCode: (params: VerifyCodeParam) => Promise<any>
}

export const AuthService: IAuthService = {
  requestCode: async (params: RequestCodeParams) => {
    const { email } = params

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    })
    if (!user) {
      throw new HttpException(400, "user not found")
    }

    const code = generateOTP()

    try {
      await redis.set(email, code, "EX", 60 * 10)
      if (isProd) {
        await sendVerifyCode({ code, email })
      }
    } catch (e) {
      if (e instanceof ResponseError) {
        throw new HttpException(500, "failed to send email: " + e.message)
      }
      if (e instanceof Error) {
        throw new HttpException(500, "unexpected error: " + e.message)
      }
    }
  },
  verifyCode: async (params: VerifyCodeParam) => {
    const { email, code } = params

    const storedCode = await getOTP(email)
    if (!storedCode) {
      throw new HttpException(400, "not exist auth session")
    }
    if (storedCode !== code) {
      throw new HttpException(400, "invalid session")
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (!user) {
      throw new HttpException(400, "invalid session")
    }

    const token = signJWT(user, { expiresIn: "7d" })
    const authCookie = cookie.serialize("Authorization", token, DEFAULT_COOKIE_OPTIONS)
    return authCookie
  },
}
