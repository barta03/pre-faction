import { Dot } from "lucide-react";
import CommentBox from "./CommentBox";
import prisma from "@/lib/prisma";
interface Comment {
  id: string;
  content: string;
  createdAt: Date;

  author: {
    id: string;
    name: string;
    username: string;
    image?: string | null;
  };
}
const CommentSection = async ({ id }: { id: string }) => {
  const allComment: Comment[] = await prisma.comment.findMany({
    where: { postId: id },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="w-full items-center">
      <CommentBox id={id} />
      <div className="h-px bg-neutral-400 my-4"></div>
      <div className="flex flex-col items-center justify-center w-full">
        {allComment &&
          allComment.map((comm) => (
            <div key={comm.id} className="w-full">
              <div className=" w-full rounded-md flex px-4 py-2 gap-2">
                <div className="h-full">
                  <div className="size-11 flex items-center justify-center bg-conic-180 from-indigo-600 via-indigo-100 to-indigo-600 rounded-full">
                    <div className="size-10 rounded-full shadow-lg/10 overflow-hidden">
                      <img
                        className="object-cover object-top rounded-full"
                        src="https://images.meigen.ai/cdn-cgi/image/format=auto,quality=85/tweets/2031663655121834175/0.jpg"
                        alt="pic"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-neutral-800">
                  <div className="flex flex-col">
                    <div>{comm?.author?.name}</div>
                    <div className="flex gap-1/2 items-center justify-center">
                      <div className="leading-4 text-sm">
                        @{comm?.author.username}
                      </div>
                      <div>
                        <Dot size={16} />{" "}
                      </div>
                      <div className="text-sm">
                        {comm.createdAt.toLocaleDateString("en-us", {
                          month: "long",
                          year: "numeric",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">{comm.content}</div>
                </div>
              </div>
              <div className="h-px bg-neutral-400 my-4"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
