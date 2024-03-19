import { useRecoilValue } from "recoil";
import { publishMessageAtom } from "../atoms";
import { useState } from "react";

export function PublishMessage() {
  const msg = useRecoilValue(publishMessageAtom);
  const [displayed, setDisplayed] = useState(true);

  setTimeout(() => {
    setDisplayed(false);
  }, 3000);
  return (
    <div
      className={`flex justify-center w-full ${
        displayed ? "visible" : "invisible"
      }`}
    >
      <button className="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold mt-3">
        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
        <p className="z-10">{msg}</p>
      </button>
    </div>
  );
}
