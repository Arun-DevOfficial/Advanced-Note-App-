import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Dashboard() {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen p-4">
        <div className="w-9/12  bg-white rounded-md flex flex-col lg:flex-row shadow-md">
          <Sidebar />
          <div className="p-5 flex-grow flex flex-col">
            <Navbar />
            <div className="mt-5 flex-grow overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
