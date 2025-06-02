import { SignUp } from "@clerk/nextjs";
export const SignUpView = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <SignUp />
    </div>
  );
};
