import rs from "randomstring"
import { prisma } from "@ference/prisma"

import { isProd } from "@/config"
import redis from "@utils/redis"
import { sendRegisterVerify } from "@utils/send-grid"
import { HttpException } from "@exceptions/HttpException"

export type RequestInput = {
  email: string
}

export type VerifyInput = {
  key: string
}

interface IRegisterService {
  startRequest: (input: RequestInput) => Promise<any>
  verifyRequest: (input: VerifyInput) => Promise<any>
}

export const RegisterService: IRegisterService = {
  startRequest: async (input: RequestInput) => {
    const { email } = input

    const checkUser = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    })
    if (checkUser) {
      throw new HttpException(400, "user already exists")
    }

    const user = await prisma.user.create({ data: { email } })
    const key = rs.generate({ length: 32 })
    await redis.set(key, user.id, "EX", 60 * 10)

    if (!isProd) {
      await sendRegisterVerify({ key, email })
    }
    return user
  },
  verifyRequest: async (input: VerifyInput) => {
    const { key } = input

    const userId = await redis.get(key)
    if (!userId) {
      throw new HttpException(400, "invalid key")
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    })
    await redis.del(key)
    return user
  },
}
