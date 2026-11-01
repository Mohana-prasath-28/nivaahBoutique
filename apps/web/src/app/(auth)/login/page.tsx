import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <PageShell
      title="Login"
      description="UI only. Sign in with phone + password."
    >
      <div className="mx-auto grid w-full max-w-xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Welcome back</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-xs font-bold text-muted-foreground">Phone (+91)</div>
              <Input placeholder="+91 9XXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-muted-foreground">Password</div>
              <Input type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm font-bold text-primary hover:underline">
                Forgot password?
              </Link>
              <Link href="/signup" className="text-sm font-bold text-primary hover:underline">
                Create account
              </Link>
            </div>

            <Button className="w-full font-extrabold">Login</Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="font-extrabold">
                Continue with Google
              </Button>
              <Button variant="outline" className="font-extrabold">
                Continue with Apple
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

