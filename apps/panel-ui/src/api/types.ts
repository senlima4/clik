export type AuthRequestOTPInput = {
  email: string
}

export type AuthVerifyOTPInput = {
  code: string
  email: string
}

export type RegisterStartInput = {
  email: string
}

export type RegisterCompleteInput = {
  key: string
}
