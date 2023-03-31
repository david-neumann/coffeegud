import type { FC } from "react";
import { auth, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import coffeeLogo from "../public/coffee-plant.png";

interface AuthProps {}

const Auth: FC<AuthProps> = ({}) => {
  return (
    <main className="mx-auto flex max-w-prose flex-col items-center justify-center pt-20">
      <div className="flex flex-col items-center">
        <Image
          src={coffeeLogo}
          alt="Coffee plant"
          width={100}
          className="mb-2 drop-shadow"
        />
        <h1 className="mb-12 text-2xl font-extrabold text-rose-500">
          coffee gud
        </h1>
      </div>
      <p className="mb-10 px-3 text-center text-lg">
        Log your coffee brews. Keep track of all your beans, water, and
        equipment. Everything you need to make your coffee gud.
      </p>
      <SignInWithGoogleButton />
    </main>
  );
};

// Sign in button
const SignInWithGoogleButton: FC = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex w-60 items-center justify-center rounded border border-['#dadce0'] py-3 font-medium hover:bg-gray-50/10"
    >
      <img src={"/google-logo.svg"} className="mr-3 w-5" />
      <span className="">Sign in with Google</span>
    </button>
  );
};

export default Auth;
