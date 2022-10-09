import * as React from "react"
import { ThemeProvider } from "theme-ui"

import { theme } from "./configs"

type ProviderProps = {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export default Provider
