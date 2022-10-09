import { API } from "../instance"

import { getAPIPath } from "../utils"
import type { RegisterStartInput, RegisterCompleteInput } from "../types"

export const startRegister = (data: RegisterStartInput) => API.post(getAPIPath("register", "/start"), data)

export const completeRegister = (data: RegisterCompleteInput) => API.post(getAPIPath("register", "/complete"), data)
