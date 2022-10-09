import { useRouter } from "next/router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import type { AuthRequestOTPInput, AuthVerifyOTPInput } from "../types"

import { QUERY_KEY } from "../constants"
import { getMe, sendRequest, sendVerify, logout } from "./fetcher"

export const useMe = () => {
  return useQuery([QUERY_KEY.me], getMe)
}

export const useRequest = () => {
  return useMutation((data: AuthRequestOTPInput) => sendRequest({ ...data }))
}

export const useVerify = () => {
  return useMutation((data: AuthVerifyOTPInput) => sendVerify({ ...data }))
}

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.me])
      router.push("/auth")
    },
  })
}
