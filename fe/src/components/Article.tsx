import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";
import { BackButton } from "./BackButton";
import { PublishMessage } from "./Message";

export function Article({ title, content, authorName, date, bio }: BlogTypes) {
  return (
    <div>
      <AppBar />
      <PublishMessage />
      <div className="w-full grid grid-cols-10 px-10 items-center mt-6 bg-slate-50 mx-7">
        <div className=" col-span-6 p-4">
          <div className="flex justify-between">
            <div className="bg-slate-200 w-[200px] text-center rounded-md">
              Published On <span className="font-semibold">{date}</span>
            </div>
            <BackButton />
          </div>
          <div className="text-6xl font-bold pt-3">{title}</div>
          <div className="text-xl font-normal pt-5">{content}</div>
        </div>
        <div className="col-span-4 p-4">
          <div className="border-b mb-4">Author</div>
          <div className="flex items-center gap-2">
            <div>
              <Avatar authorName={authorName} />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl">{authorName}</div>
              <div className="text-gray-700">{bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlogTypes {
  title: string;
  content: string;
  date: string;
  authorName: string;
  bio?: string;
}
