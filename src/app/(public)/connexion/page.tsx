import SignInForm from "@/components/form/sign-in";
import Image from "next/image";

const SignInPage = () => (
  <div className="flex flex-col md:flex-row h-full">
    <div className="relative hidden md:block md:w-1/2">
      <Image
        src="/placeholder.svg"
        alt="Sign in background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>

    <div className="flex w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 md:w-1/2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  </div>
);

export default SignInPage;
