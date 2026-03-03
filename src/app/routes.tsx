import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { StudentLogin } from "./pages/StudentLogin";
import { StudentRegister } from "./pages/StudentRegister";
import { StudentDashboard } from "./pages/StudentDashboard";
import { SubmitComplaint } from "./pages/SubmitComplaint";
import { TrackComplaints } from "./pages/TrackComplaints";
import { StudentProfile } from "./pages/StudentProfile";
import { Notifications } from "./pages/Notifications";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/student/login",
    Component: StudentLogin,
  },
  {
    path: "/student/register",
    Component: StudentRegister,
  },
  {
    path: "/student/dashboard",
    element: <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>,
  },
  {
    path: "/student/submit-complaint",
    element: <ProtectedRoute role="student"><SubmitComplaint /></ProtectedRoute>,
  },
  {
    path: "/student/track-complaints",
    element: <ProtectedRoute role="student"><TrackComplaints /></ProtectedRoute>,
  },
  {
    path: "/student/profile",
    element: <ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>,
  },
  {
    path: "/student/notifications",
    element: <ProtectedRoute role="student"><Notifications /></ProtectedRoute>,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>,
  },
]);
