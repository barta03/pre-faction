import PostCard from "@/components/PostCard";
import { cookies } from 'next/headers';


export default async function Home() {
  // const router = useRouter();

  // const data = await fetch("/api/posts") 
   const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const data = await fetch("http://localhost:3000/api/posts",{headers:{Cookie:allCookies}})
  const posts = await data.json()
  console.log(posts)
  console.log(data)

  return (
    <main className="xl:max-w-7xl lg:max-w-5xl max-w-4xl mx-auto w-screen flex items-center justify-center h-screen text-neutral-800 gap-4 mt-4">
      <div className="w-full h-full flex-2 xl:flex-3">
        <div className="h-px w-full bg-neutral-400"></div>
        {posts.map((post:any)=>(
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
