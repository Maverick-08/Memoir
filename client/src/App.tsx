import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import AllInterviews from "./components/interview/AllInterviews";
import PersonalInterviews from "./components/interview/PersonalInterviews";
import AddExperience from "./components/interview/AddExperience";
import ProtectedRoute from "./ProtectedRoute";

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
      <ProtectedRoute>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/allInterviews",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <AllInterviews />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/personalInterviews",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PersonalInterviews />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addExperience",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <AddExperience />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={2000}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
