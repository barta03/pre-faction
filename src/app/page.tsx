import PostCard from "@/components/PostCard";

export default async function Home() {
  // const router = useRouter();

  const data = await fetch("http://localhost:3000/api/posts")
  const posts = await data.json()
  console.log(posts)

  return (
    <main className="xl:max-w-7xl lg:max-w-5xl max-w-4xl mx-auto w-screen flex items-center justify-center h-screen text-neutral-800 gap-4 mt-4">
      <div className="w-full h-full flex-2 xl:flex-3">
        <div className="h-px w-full bg-neutral-400"></div>
        {posts.map((post:any)=>(
          <PostCard
          key={post.id}
          fullName={post.author.name}
          userName={undefined}
          title={post.title}
          content={post.content}
          comments={post.comments ?? 0}
          likes={post.likes ?? 0}
        />
        ))}
      </div>
      <div className="w-full h-full flex-1 bg-emerald-500"></div>
    </main>
  );
}
