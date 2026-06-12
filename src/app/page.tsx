import PostCard from "@/components/PostCard";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getCurrentUserServer } from "@/lib/getCurrentUIserServer";


export default async function Home() {
  // const router = useRouter();

  // const data = await fetch("/api/posts") 
   const cookieStore = await cookies();

  const user = await getCurrentUserServer()

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },

      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },

      likes: user
        ? {
            select: {
              userId: true,
            },
          }
        : false,
    },
  });

  const transformedPosts = posts.map((post) => ({
    ...post,

    likedByCurrentUser: user
      ? post.likes.some((like) => like.userId === user.id)
      : false,
  }));

  return (
    <main className="xl:max-w-7xl lg:max-w-5xl max-w-4xl mx-auto w-screen flex items-center justify-center min-h-screen text-neutral-800 gap-4 mt-4">
      <div className="w-full h-full flex-2 xl:flex-3">
        <div className="h-px w-full bg-neutral-400"></div>
        {transformedPosts.map((post:any)=>(
          <PostCard
          key={post.id}
          id={post.id}
          fullName={post.author.name}
          userName={post.author.username}
          title={post.title}
          content={post.content}
          comments={post._count?.comments ?? 0}
          likes={post._count?.likes ?? 0}
          likedByCurrentUser={post.likedByCurrentUser}
        />
        ))}
      </div>
      <div className="w-full h-full flex-1 bg-emerald-500"></div>
    </main>
  );
}
