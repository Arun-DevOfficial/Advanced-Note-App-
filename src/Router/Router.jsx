import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../Components/Loader";
import PageNotFound from "../Components/PageNotFound";
import ErrorPage from "../Components/ErrorPage";

// Lazily import components for dashboard sections
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Home = lazy(() => import("../Pages/Home"));
const Calendar = lazy(() => import("../Pages/Calendar"));
const Archive = lazy(() => import("../Pages/Archive"));
const Trash = lazy(() => import("../Pages/Trash"));
const Search = lazy(() => import("../Pages/Search"));
const SignIn = lazy(() => import("../Pages/SignUp"));

const DashboardLayout = () => (
  <Suspense fallback={<Loader />}>
    <Dashboard /> {/* Render the Dashboard layout */}
  </Suspense>
);

const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <SignIn />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default Routers;
