import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider as NoteProvider } from "./Context/NoteContext.jsx"; // Renamed for clarity
import { RouterProvider } from "react-router-dom";
import Routers from "./Router/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./Components/Loader.jsx";

// Initialize the Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loader />}>
    <QueryClientProvider client={queryClient}>
      <NoteProvider>
        <RouterProvider router={Routers} />
      </NoteProvider>
    </QueryClientProvider>
  </Suspense>
);
