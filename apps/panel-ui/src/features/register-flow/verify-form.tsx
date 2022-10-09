import * as React from "react"
import noop from "lodash/noop"
import { useForm } from "react-hook-form"
import { Box, Flex, Label, Button, Input } from "theme-ui"

import { useRegisterComplete } from "@/api/register"
import type { RegisterCompleteInput } from "@/api/types"

type VerifyFormProps = {
  token?: string
  onVerified?: () => void
}

const VerifyForm: React.FC<VerifyFormProps> = ({ token, onVerified = noop }) => {
  const { handleSubmit, register } = useForm<RegisterCompleteInput>({
    defaultValues: {
      key: token,
    },
  })
  const { mutate } = useRegisterComplete()

  const onSubmit = (data: RegisterCompleteInput) => {
    mutate(data, {
      onSuccess() {
        onVerified()
      },
    })
  }

  React.useEffect(() => {
    if (token) {
      onSubmit({ key: token })
    }
  }, [token])

  return (
    <Flex as="form" id="verify-auth" sx={{ flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <Label htmlFor="code">Code</Label>
        <Input {...register("key")} />
      </Box>

      <Button type="submit">Verify</Button>
    </Flex>
  )
}

export default React.memo(VerifyForm)
