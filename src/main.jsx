import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider as NoteProvider } from "./Context/NoteContext.jsx"; // Renamed for clarity
import { RouterProvider } from "react-router-dom";
import Routers from "./Router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
    <NoteProvider>
      <RouterProvider router={Routers} />
    </NoteProvider>
  </Suspense>
);
