import { useState } from "react";
import { Avatar } from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import { ExitButton } from "./ExitButton";
import { AddButton } from "./AddButton";
import { ProfileComponents } from "./Profile";
import { useRecoilValue } from "recoil";
import { userNameSelector } from "../atoms";

export function AppBar() {
  const [isClicked, setIsClicked] = useState(false);
  const [toggle, setToggle] = useState("invisible");
  const navigate = useNavigate();
  const name = useRecoilValue(userNameSelector);

  function handleClick() {
    setIsClicked(!isClicked);
    setToggle(isClicked ? "visible" : "invisible");
  }

  function handleHome() {
    navigate("/blogs");
  }
  return (
    <div
      className={`flex px-10 justify-between border-b border-blue-200 items-center mb-3 ${
        isClicked ? "py-3" : "py-3"
      }`}
    >
      <div className="text-3xl">Blogger</div>
      <div className="flex gap-3 items-center justify-center">
        <Link to={"/publish"}>
          <AddButton />
        </Link>
        <ExitButton onClick={handleHome} />
        <a onClick={handleClick} className="w-[30px] h-[30px] cursor-pointer">
          <Avatar authorName={name} />
          <div className={`${toggle}`}>
            <ExtendAvatar />
          </div>
        </a>
      </div>
    </div>
  );
}

function ExtendAvatar() {
  return (
    <div className="flex flex-col bg-slate-700 w-[150px] h-[200px] overflow-auto items-center translate-x-[-100px] translate-y-[30px] mb-1">
      <ProfileComponents />
    </div>
  );
}
