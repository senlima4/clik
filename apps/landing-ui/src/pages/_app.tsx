import type { AppProps } from "next/app"

import ThemeProvider from "@/theme/Provider"

import "../styles/css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
