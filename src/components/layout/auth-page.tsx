import Image from "next/image";

interface AuthPageLayoutProps {
  children: React.ReactNode;
  title: string;
  image: string;
}

const AuthPageLayout = ({ children, title, image }: AuthPageLayoutProps) => (
  <div className="flex flex-col md:flex-row h-full bg-gray-50">
    <div className="relative hidden md:block md:w-1/2">
      <Image
        src={image}
        alt={title}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>

    <div className="flex w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 md:w-1/2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthPageLayout;
