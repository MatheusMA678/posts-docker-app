import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { RootLayout } from "./layouts/layout"
import { Login } from "./pages/login"
import { UserContextProvider } from "./contexts/user-context"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { FormProvider, useForm } from "react-hook-form"
import { Register } from "./pages/register"

export function App() {
  const methods = useForm()

  return (
    <UserContextProvider>
      <ThemeProvider>
        <FormProvider {...methods}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </FormProvider>
        <Toaster />
      </ThemeProvider>
    </UserContextProvider>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/entrar" element={<Login />}/>
      <Route path="/registrar" element={<Register />}/>
    </Routes>
  )
}
