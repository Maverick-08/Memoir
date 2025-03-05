import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import { SnackbarProvider} from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <LandingPage />
      </MainLayout>
    ),
  },
  {
    path: "/auth",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
