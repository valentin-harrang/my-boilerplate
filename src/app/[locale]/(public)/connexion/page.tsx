import SignInForm from "@/components/form/sign-in";
import AuthPageLayout from "@/components/layout/auth-page";

const SignInPage = () => (
  <AuthPageLayout title="Connexion" image="/placeholder.svg">
    <SignInForm />
  </AuthPageLayout>
);

export default SignInPage;
