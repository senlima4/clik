import crypto from "crypto"

import { isDev, TEST_CODE } from "@/config"

import redis from "./redis"

export const generateOTP = (): string => {
  return isDev ? TEST_CODE : crypto.randomInt(0, 1000000).toString().padStart(6, crypto.randomInt(0, 9).toString())
}

export const getOTP = async (key: string) => {
  return isDev ? TEST_CODE : await redis.get(key)
}
