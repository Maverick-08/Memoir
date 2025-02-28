import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path:"/",
    element:<LandingPage />
  }
])

function App() {


  return (
    <MainLayout>
      <RouterProvider router={router}/>
    </MainLayout>
  )
}

export default App
