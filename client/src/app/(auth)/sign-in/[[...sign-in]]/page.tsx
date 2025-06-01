import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Page;
