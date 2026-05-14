import PostContent from "@/components/PostContent";
import {
  CalendarDaysIcon,
  HeartIcon,
  MessageSquare,
  Share,
  Undo2,
} from "lucide-react";
import prisma from "@/lib/prisma";
import GoBackButton from "@/components/GoBackButton";
import Editor from "@/components/Editor";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      _count: { select: { likes: true } },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mt-10 max-w-4xl w-full mx-auto text-neutral-600 pb-30">
      <div className="w-full flex">
        <GoBackButton />
      </div>

      <div className="min-w-full w-full flex flex-col ">
        <h1 className="text-neutral-900 font-bold text-4xl tracking-tighter capitalize mb-4 mt-6">
          {post.title}
        </h1>
        <div className="min-w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-1 items-center text-sm">
              <CalendarDaysIcon size={16} />
              <p>
                {post.createdAt.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <button className="flex cursor-pointer group">
              <div className="rounded-md text-sm bg-neutral-100 flex justify-center items-center gap-1 p-1 duration-200 transition-all">
                <HeartIcon
                  className={`size-7 stroke-1 py-1 group-hover:bg-pink-200 group-hover:scale-105  group-hover:text-pink-500 rounded-sm duration-200 transition-all `}
                />

                <p className="pb-1 pr-1 text-md text-neutral-700 duration-200 transition-all mt-1">
                  {post?._count.likes}
                </p>
              </div>
            </button>
          </div>
          <div className="flex">
            <button className="flex px-3 py-1 items-center ring-1 ring-neutral-400/50 justify-center gap-2 rounded-sm hover:bg-neutral-300/40 hover:ring-neutral-500/60 cursor-pointer text-sm text-neutral-600 font-medium">
              <Share size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-400 my-4"></div>

        <div className="post-preview overflow-hidden  mb-10">
          <PostContent content={post.content} />
        </div>
        <div className="w-full h-px bg-neutral-400 my-4"></div>
        <div className="flex items-center gap-2">
          <div className="ring-1 ring-neutral-400 w-full flex items-center justify-center hover:ring-2 focus-within:ring-2 rounded-md px-2 py-2 gap-2 focus-within:ring-green-700/70">
            <MessageSquare size={20} className="text-neutral-400 " />
            <input
              type="text"
              className=" w-full outline-0"
              placeholder="Share your thoughts ..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
