import * as React from "react"
import noop from "lodash/noop"
import { useForm } from "react-hook-form"
import { Box, Flex, Label, Button, Input } from "theme-ui"

import { useVerify } from "@/api/auth"
import type { AuthVerifyOTPInput } from "@/api/types"

type VerifyFormProps = {
  target: string
  onVerified?: () => void
}

const VerifyForm: React.FC<VerifyFormProps> = ({ target, onVerified = noop }) => {
  const { handleSubmit, register } = useForm<AuthVerifyOTPInput>({
    defaultValues: {
      email: target,
      code: "",
    },
  })
  const mutation = useVerify()

  const onSubmit = (data: AuthVerifyOTPInput) => {
    mutation.mutate(data, {
      onSuccess() {
        onVerified()
      },
    })
  }

  return (
    <Flex as="form" id="verify-auth" sx={{ flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
      <Input type="hidden" {...register("email")} />

      <Box mb={4}>
        <Label htmlFor="code">Code</Label>
        <Input {...register("code")} />
      </Box>

      <Button type="submit">Verify</Button>
    </Flex>
  )
}

export default React.memo(VerifyForm)
