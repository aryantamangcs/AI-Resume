import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignUp />
    </div>
  );
};

export default Page;
