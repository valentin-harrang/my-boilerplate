import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationsTab() {
  return (
    <div className="space-y-8">
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <p className="text-gray-600 mb-6">Manage your notification settings.</p>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="email-notifications"
              className="flex flex-col space-y-1"
            >
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive notifications via email
              </span>
            </Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="push-notifications"
              className="flex flex-col space-y-1"
            >
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive push notifications on your devices
              </span>
            </Label>
            <Switch id="push-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="marketing-emails"
              className="flex flex-col space-y-1"
            >
              <span>Marketing Emails</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive emails about new products and features
              </span>
            </Label>
            <Switch id="marketing-emails" />
          </div>
        </div>
      </section>
    </div>
  );
}
