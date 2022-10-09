import { API } from "../instance"

import { getAPIPath } from "../utils"
import type { AuthRequestOTPInput, AuthVerifyOTPInput } from "../types"

export const getMe = () => API.get(getAPIPath("auth", "/whoami"))

export const sendRequest = (data: AuthRequestOTPInput) => API.post(getAPIPath("auth", "/request-otp"), data)

export const sendVerify = (data: AuthVerifyOTPInput) => API.post(getAPIPath("auth", "/verify-otp"), data)

export const logout = () => API.post(getAPIPath("auth", "/logout"), {})
