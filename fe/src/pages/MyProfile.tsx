import { useRecoilValue } from "recoil";
import { userBioSelector, userNameSelector } from "../atoms";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <Naming />
      <ProfileCard />
    </div>
  );
};

function ProfileCard() {
  const navigate = useNavigate();
  const authorName = useRecoilValue(userNameSelector);
  const userBio = useRecoilValue(userBioSelector);

  return (
    <div className="mt-4">
      <div className="group before:hover:scale-95  before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 h-72 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden w-[350px]">
        <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24  group-hover:-translate-y-20 transition-all duration-500 flex items-center justify-center">
          <div className="text-6xl">
            {authorName[0] + authorName.split(" ")[1][0]}
          </div>
        </div>
        <div className="z-10  group-hover:-translate-y-10 transition-all duration-500">
          <span className="text-2xl font-semibold">{authorName}</span>
        </div>
        <p className="overflow-auto">
          <span className="font-bold">Bio: </span>
          {userBio}
        </p>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
        >
          Home
        </button>
      </div>
    </div>
  );
}

function Naming() {
  return (
    <div>
      <button className="cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[150px]">
        Your Profile
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          ></path>
        </svg>
      </button>
    </div>
  );
}
