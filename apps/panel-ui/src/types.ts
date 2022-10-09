import type { NextPageContext } from "next"
import type { AppProps } from "next/app"
import type { DehydratedState } from "@tanstack/react-query"

type PageProps = {
  dehydratedState?: DehydratedState
}

type ExtendedAppProps<P = {}> = {
  err?: NextPageContext["err"]
} & AppProps<P>

export type CustomAppProps = ExtendedAppProps<PageProps>
