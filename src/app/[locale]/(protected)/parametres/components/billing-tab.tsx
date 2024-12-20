import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BillingTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your subscription and payment details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Pro plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$29.99 / month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Change Plan</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment method.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Visa ending in 1234</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Update Payment Method</Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

