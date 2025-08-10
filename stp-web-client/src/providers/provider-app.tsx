import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider";
interface Props extends PropsWithChildren {

}
const queryClient = new QueryClient()
export default function ProviderApp({ children }: Props) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}