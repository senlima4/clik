import * as React from "react"
import { useRouter } from "next/router"

import type { AuthRequestOTPInput } from "@/api/types"

import VerifyForm from "./verify-form"
import RequestForm from "./request-form"

const RegisterWidget: React.FC = () => {
  const router = useRouter()
  const [target, setTarget] = React.useState<string | null>(null)

  const handleSetTarget = React.useCallback((data: AuthRequestOTPInput) => {
    setTarget(data.email)
  }, [])

  const handleAfterVerified = React.useCallback(() => {
    router.push("/")
  }, [router])

  return target ? (
    <VerifyForm target={target} onVerified={handleAfterVerified} />
  ) : (
    <RequestForm onRequested={handleSetTarget} />
  )
}

export default React.memo(RegisterWidget)
