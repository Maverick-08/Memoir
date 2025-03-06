import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";

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
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
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
