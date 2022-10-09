import * as React from "react"
import type { GetServerSideProps, NextPage } from "next"
import RegisterFlowWidget from "@/features/register-flow/widget"

type PageProps = {
  token?: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context

  return {
    props: {
      token: query.token,
    },
  }
}

const RegisterCompletePage: NextPage<PageProps> = ({ token }) => {
  return <RegisterFlowWidget defaultStatus="verifying" token={token} />
}

export default RegisterCompletePage
