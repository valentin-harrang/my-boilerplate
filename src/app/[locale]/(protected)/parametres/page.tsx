import { getUserOrRedirect, getUserProfile } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/components/navigation/breadcrumb";
import SettingsTab from "./components/settings-tab";
import BillingTab from "./components/billing-tab";
import NotificationsTab from "./components/notifications-tab";

const SettingsPage = async () => {
  const user = await getUserOrRedirect();
  const userProfile = await getUserProfile(user.id);

  if (!userProfile) {
    return <p>Impossible de charger le profil utilisateur.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <Breadcrumb />
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="settings">
              <SettingsTab user={user} userProfile={userProfile} />
            </TabsContent>
            <TabsContent value="billing">
              <BillingTab />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
