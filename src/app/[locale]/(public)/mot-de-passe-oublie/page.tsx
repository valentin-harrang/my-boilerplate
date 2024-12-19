import PasswordForgottenForm from "@/components/form/password-forgotten";
import AuthPageLayout from "@/components/layout/auth-page";

const PasswordForgottenPage = () => (
  <AuthPageLayout title="Mot de passe oublié" image="/placeholder.svg">
    <PasswordForgottenForm />
  </AuthPageLayout>
);

export default PasswordForgottenPage;
