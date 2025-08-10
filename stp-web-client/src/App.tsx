import { useRoutes } from "react-router-dom"
import { publicRoutes } from "./routes/public.routes"
import { privateRoutes } from "./routes/private.routes"
function App() {
  return useRoutes(publicRoutes.concat(privateRoutes))
}

export default App
