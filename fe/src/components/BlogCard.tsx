import { useBlogs } from "../hooks";
import { Avatar } from "./Avatar";
import { Skeleton } from "./Skeleton";

export function BlogCard({
  title,
  content,
  date,
  route,
  authorName,
}: BlogTypes) {
  const { loading } = useBlogs();

  if (loading) {
    return <Skeleton />;
  }

  return (
    <a href={route}>
      <div className="flex flex-col bg-slate-200 w-[700px] h-auto  justify-center pl-3 border-b border-slate-400 pt-3 mb-3 pb-3 max-w-2xl overflow-auto">
        <div className="flex items-center gap-2">
          <Avatar authorName={authorName} />
          {authorName}
          <Dot />
          Posted on {date}
        </div>
        <div>
          <h1 className="font-bold text-3xl font-[Urbanist] pt-1">
            {title.length > 50 ? content.slice(0, 70) + "..." : title}
          </h1>
        </div>
        <div>
          <p className="text-xl text-slate-700 pt-3">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
          </p>
        </div>
        <div className="pt-3 ">
          <div className="flex text-slate-300 bg-black w-[100px] justify-center">
            <p>{Math.ceil(content.length / 60)} min read</p>
          </div>
        </div>
      </div>
    </a>
  );
}

interface BlogTypes {
  title: string;
  content: string;
  date: string;
  route?: string;
  authorName: string;
}

export function Dot() {
  return <div className="rounded-full bg-slate-400 w-1 h-1"></div>;
}
