import Image from "next/image";
import logo from "@/assets/logo.png";
export const Logo = () => {
  return (
    <div className="flex gap-4 items-center">
      <Image src={logo} width={55} height={35} alt="logo" />
      <h4 className="font-bold text-xl">AI Resume Builder </h4>
    </div>
  );
};
