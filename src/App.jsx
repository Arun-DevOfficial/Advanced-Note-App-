import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen">
        <div className="w-9/12 bg-white rounded-md flex h-6/12">
          <div>
            <Sidebar />
          </div>
          <div className="p-5 flex-grow">
            <Navbar />
            <div className="mt-5">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
