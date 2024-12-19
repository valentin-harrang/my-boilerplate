import SignUpForm from "@/components/form/sign-up";
import AuthPageLayout from "@/components/layout/auth-page";

const SignUpPage = () => (
  <AuthPageLayout title="Inscription" image="/placeholder.svg">
    <SignUpForm />
  </AuthPageLayout>
);

export default SignUpPage;
