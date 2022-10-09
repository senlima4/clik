import { useMutation } from "@tanstack/react-query"

import type { RegisterStartInput, RegisterCompleteInput } from "../types"

import { startRegister, completeRegister } from "./fetcher"

export const useRegisterStart = () => {
  return useMutation((data: RegisterStartInput) => startRegister({ ...data }))
}

export const useRegisterComplete = () => {
  return useMutation((data: RegisterCompleteInput) => completeRegister({ ...data }))
}
