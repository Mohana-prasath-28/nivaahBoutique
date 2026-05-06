import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <PageShell title="Forgot Password" description="UI only. Reset via phone/email flow later.">
      <div className="mx-auto grid w-full max-w-xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reset your password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-xs font-bold text-muted-foreground">Phone (+91) or Email</div>
              <Input placeholder="+91 9XXXXXXXXX / name@email.com" />
            </div>
            <Button className="w-full font-extrabold">Send reset link / OTP</Button>
            <div className="text-center text-sm text-muted-foreground">
              Back to{" "}
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

