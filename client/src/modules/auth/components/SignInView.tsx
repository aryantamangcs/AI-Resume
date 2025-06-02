import { SignIn } from "@clerk/nextjs";
export const SignInView = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignIn />
    </div>
  );
};
