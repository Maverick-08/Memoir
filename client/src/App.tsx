import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import { SnackbarProvider } from "notistack";
import Dashboard from "./components/Dashboard/Dashboard";
import PersonalInterviews from "./components/interview/PersonalInterviews";
// import AddExperience from "./components/interview/AddExperience";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import UserMessages from "./messages/UserMessage";
import Notifications from "./Notifications/Notifications";
import Profile from "./profile/Profile";
import InterviewExperiences from "./components/interview/InterviewExperiences";
import ShareExperience from "./components/interview/ShareExperience";

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
          <InterviewExperiences />
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
          <ShareExperience />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <UserMessages />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Notifications />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Profile />
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
