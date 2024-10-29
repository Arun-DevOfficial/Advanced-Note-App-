import { LuFileEdit } from "react-icons/lu";
import { PiTimer } from "react-icons/pi";

export default function NoteCard() {
  return (
    <>
      <div className="bg-white p-6 rounded-lg cursor-pointer h-[360px] transition-shadow duration-300 border border-gray-200">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">28/10/24</p>
              <h1 className="font-semibold text-2xl mt-1">Performance</h1>
            </div>

            <div className="cursor-pointer">
              <LuFileEdit size={24} className="text-gray-400" />
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-gray-700 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            saepe iste delectus dolore ex hic repellat, magni sunt voluptatum
            vero. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio saepe iste delectus dolore ex hic repellat, magni sunt
            voluptatum vero.
          </p>
          <div className="flex gap-3 items-center mt-4 text-gray-500">
            <PiTimer size={21} />
            <p>04:30 PM, Sunday</p>
          </div>
        </div>
      </div>
    </>
  );
}
