import * as React from "react"
import { useRouter } from "next/router"

import VerifyForm from "./verify-form"
import RequestForm from "./request-form"

type RegisterStatus = "idle" | "verifying"

type RegisterWidget = {
  token?: string
  defaultStatus?: RegisterStatus
}

const RegisterWidget: React.FC<RegisterWidget> = ({ token, defaultStatus = "idle" }) => {
  const router = useRouter()
  const [status, setStatus] = React.useState<RegisterStatus>(defaultStatus)

  const handleSetTarget = React.useCallback(() => {
    setStatus("verifying")
  }, [])

  const handleAfterVerified = React.useCallback(() => {
    router.push("/")
  }, [router])

  return status === "verifying" ? (
    <VerifyForm token={token} onVerified={handleAfterVerified} />
  ) : (
    <RequestForm onRequested={handleSetTarget} />
  )
}

export default React.memo(RegisterWidget)
