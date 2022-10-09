import * as React from "react"
import noop from "lodash/noop"
import { useForm } from "react-hook-form"
import { Flex, Box, Label, Input, Button } from "theme-ui"

import { useRequest } from "@/api/auth"
import type { AuthRequestOTPInput } from "@/api/types"

type RequestFormProps = {
  onRequested?: (data: AuthRequestOTPInput) => void
}

const RequestForm: React.FC<RequestFormProps> = ({ onRequested = noop }) => {
  const { register, handleSubmit } = useForm<AuthRequestOTPInput>()
  const mutation = useRequest()

  const onSubmit = (data: AuthRequestOTPInput) => {
    mutation.mutate(data, {
      onSuccess() {
        onRequested(data)
      },
    })
  }

  return (
    <Flex as="form" id="request-auth" sx={{ flexDirection: "column" }} onSubmit={handleSubmit(onSubmit)}>
      <Box mb={4}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="account@mail.com" {...register("email", { required: true })} />
      </Box>

      <Button type="submit">Submit</Button>
    </Flex>
  )
}

export default React.memo(RequestForm)
