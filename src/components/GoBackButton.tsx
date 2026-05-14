"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex px-2 py-1 items-center ring-1 ring-neutral-400/50 justify-center gap-2 rounded-sm hover:bg-neutral-300/40 hover:ring-neutral-500/60 cursor-pointer text-sm text-neutral-900 font-medium"
    >
      <Undo2 className="size-4 stroke-2" />
      Go Back
    </button>
  );
};

export default GoBackButton;
