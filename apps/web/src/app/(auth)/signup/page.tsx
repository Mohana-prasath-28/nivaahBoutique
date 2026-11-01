import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignupPage() {
  return (
    <PageShell title="Signup" description="UI only. Create your account then verify OTP.">
      <div className="mx-auto grid w-full max-w-xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground">Name</div>
                <Input placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground">DOB (DD/MM/YYYY)</div>
                <Input placeholder="DD/MM/YYYY" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground">Email</div>
                <Input placeholder="name@email.com" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground">Phone (+91)</div>
                <Input placeholder="+91 9XXXXXXXXX" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="text-xs font-bold text-muted-foreground">Gender</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <div className="text-xs font-bold text-muted-foreground">Password</div>
                <Input type="password" placeholder="Create a password" />
              </div>
            </div>

            <Button className="w-full font-extrabold">Send OTP</Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

