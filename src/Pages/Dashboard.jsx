import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {NoteContext} from '../Context/NoteContext'
import { useContext } from "react";
import NoteForm from "../Components/NoteForm";

function Dashboard() {
  const {NoteModel} = useContext(NoteContext);

  return (
    <>
      <section className="flex bg-gray-100 w-full">
        <Sidebar />
        <div className="bg-white rounded-md w-full">
          <Navbar />
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </section>
      {NoteModel && <NoteForm />}
    </>
  );
}

export default Dashboard;
