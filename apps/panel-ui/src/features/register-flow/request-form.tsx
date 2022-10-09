import * as React from "react"
import noop from "lodash/noop"
import { useForm } from "react-hook-form"
import { Flex, Box, Label, Input, Button } from "theme-ui"

import { useRegisterStart } from "@/api/register"
import type { RegisterStartInput } from "@/api/types"

type RequestFormProps = {
  onRequested?: (data: RegisterStartInput) => void
}

const RequestForm: React.FC<RequestFormProps> = ({ onRequested = noop }) => {
  const { register, handleSubmit } = useForm<RegisterStartInput>()
  const mutation = useRegisterStart()

  const onSubmit = (data: RegisterStartInput) => {
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
