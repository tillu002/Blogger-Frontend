export function Avatar({ authorName }: aType) {
  return (
    <div className="flex justify-center rounded-full w-5 h-5 bg-black text-white p-4 items-center">
      {authorName[0] + authorName.split(" ")[1][0]}
    </div>
  );
}

interface aType {
  authorName: string;
}
