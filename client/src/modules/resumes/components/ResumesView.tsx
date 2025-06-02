import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const ResumesView = () => {
  return (
    <div className="w-screen justify-center flex max-w-[1000px] p-4">
      <NewResumeButton />
    </div>
  );
};

const NewResumeButton: FC = () => {
  return (
    <Button asChild className="w-fit">
      <Link href="/editor">
        <PlusSquare width={20} height={20} />
        <span className="text-sm">New Resume </span>
      </Link>
    </Button>
  );
};
