"use client";

import InputField from "@/components/ui/InputField";
import { signIn } from "@/lib/auth-client";
import { Loader, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading,setIsLoading] = useState<true|false>(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true)
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    if (res?.data?.token) {
    localStorage.setItem("token", res.data.token); // 🔥 STORE HERE
  }

    if (res.error) {
      setError(res.error.message || "Something went wrong");
      
    } else {
      router.push("/");
    }
    setIsLoading(false)
  }

  return (
    // <main className="min-h-screen flex flex-col items-center justify-center">
    //   <div className="max-w-md px-16 pt-10 pb-12 my-auto h-full flex items-center justify-center flex-col mx-auto shadow-lg/8 shadow-neutral-700 space-y-4 text-neutral-950 rounded-3xl gap-4 relative bg-neutral-200/10">
    //     <img
    //       src="./bgno.webp"
    //       className="mix-blend-multiply absolute w-40 top-100 -left-10 scale-y-[-1] rotate-90"
    //       alt=""
    //     />
    //     <img
    //       className="mix-blend-multiply absolute w-50 bottom-100 -right-10 scale-x-[-1] rotate-90"
    //       src="./bgno.webp"
    //       alt=""
    //     />
    //     <h1 className="text-4xl absolute -top-6 text-shadow-slate-500  tracking-tighter text-neutral-800 ">
    //       iNK
    //       <span className="font-bold text-shadow-md/10 text-purple-700">4</span>
    //       m
    //     </h1>
    //     <h1 className="text-2xl font-semibold ">Sign In</h1>
    //     {error && <p className="text-red-500">{error}</p>}
    //     <form
    //       onSubmit={handleSubmit}
    //       className="space-y-4 flex flex-col justify-center items-start w-sm px-8 gap-4"
    //     >
    //       {" "}
    //       <div className="flex flex-col gap-2 w-full ">
    //         <label className="text-md tracking-wide">Enter your Email</label>
    //         <InputField
    //           name="email"
    //           type="email"
    //           placeholder="Email"
    //           required
    //         />
    //       </div>{" "}
    //       <div className="flex flex-col gap-2 w-full">
    //         <label className="text-md tracking-wide">Enter your Password</label>
    //         <InputField
    //           name="password"
    //           type="password"
    //           placeholder="Password"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-neutral-900 text-white rounded-md px-4 py-2 hover:ring-2 cursor-pointer hover:bg-white hover:ring-neutral-900 hover:text-neutral-900 transition-all duration-300 ring-2 ring-neutral-900 text-lg font-semibold"
    //       >
    //         {" "}
    //         Sign In
    //       </button>{" "}
    //     </form>{" "}
    //   </div>
    // </main>
    <main className="flex items-center justify-center max-w-5xl w-full mx-auto my-auto gap-10">
      <div className=" h-200 w-1/2 rounded-3xl px-10">
        <img src="./logo.png" className="w-20" alt="" />
        <h1 className="text-3xl font-semibold font-[ysabeauSC]">Sign In</h1>
        {error && <p className="text-red-600 font-semibold mt-5 -mb-11">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col mt-12 gap-4 mb-2"
        >
          <div className="flex flex-col items-start justify-center gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              {" "}
              Email Address
            </label>
            <InputField
              name="email"
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              required
              icon={Mail}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <label htmlFor="password" className="text-lg font-semibold">
              {" "}
              Password
            </label>
            <InputField
              name="password"
              id="password"
              type="password"
              placeholder="****"
              className="placeholder:tracking-[5px] tracking-[5px]"
              required
              icon={LockKeyhole}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2 items-center cursor-pointer group transiton-all duration-200">
            <input
              id="remember-me"
              type="checkbox"
              className="appearance-none border-2 hover:border-emerald-600 checked:border-0 rounded-sm checked:bg-emerald-500 h-4 w-4 cursor-pointer transiton-all duration-200"
            />
            <label
              htmlFor="remember-me"
              className="font-semibold  cursor-pointer group-hover:underline transiton-all duration-200"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={` w-full rounded-md bg-neutral-900 py-2 px-4 text-white font-bold cursor-pointer hover:bg-neutral-800 active:scale-99 hover:scale-101 hover:shadow-xl/10 transition-all duraion-200 flex items-center justify-center ${isLoading && "opacity-75"}`}
          >
            {isLoading ? <Loader className="animate-spin animation-duration:[1.5s]"/>:"Sign In"}
          </button>
        </form>
        <p>
          Dont have an account?{" "}
          <Link href={"/sign-up"} className="underline font-bold cursor pointer">Sign Up</Link>
        </p>
      </div>
      <div className="bg- h-200 w-1/2 relative overflow-hidden rounded-4xl shadow-2xl/60">
        <video
          autoPlay
          muted
          loop={true}
          src="./bloom.mp4"
          className="absolute w-full h-full object-cover object-center hover:scale-105 transition-all duration-1000 rounded-3xl"
        ></video>
      </div>
    </main>
  );
}


