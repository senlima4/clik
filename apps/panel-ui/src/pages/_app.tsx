import * as React from "react"
import { theme } from "@ference/desegni"
import { ThemeProvider } from "theme-ui"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { CustomAppProps } from "@/types"

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
