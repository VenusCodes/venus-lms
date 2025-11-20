"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
  const router = useRouter();

  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string>("");
  const [emailVerificationPending, setEmailVerificationTransition] =
    useTransition();

  async function verifyOtp() {
    console.log("Verifying OTP:", otp);
    setEmailVerificationTransition(async () => {
      try {
        await authClient.signIn.emailOtp({
          email: email,
          otp: otp,
          fetchOptions: {
            onSuccess: () => {
              console.log("OTP verification successful");
              toast.success("Email verified successfully, redirecting...    ");
              router.push("/");
            },
            onError: (ctx) => {
              console.error("OTP verification failed:", ctx.error.message);
              toast.error("Failed to verify email/OTP. Please try again.");
            },
          },
        });
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    });
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Check your email</CardTitle>
        <CardDescription>
          We've sent a verification link to your email. Please check your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 space-y-6">
        <div className="w-full flex flex-col items-center gap-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground space-y-2">
            Enter the 6-digit code sent to your email.
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Didn't receive the email? Check your spam folder or{" "}
            <button className="text-primary hover:underline">
              request a new code
            </button>
            .
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => verifyOtp()}
          disabled={otp.length !== 6 || emailVerificationPending}
        >
          {emailVerificationPending ? "Verifying..." : "Verify Account"}
        </Button>
      </CardContent>
    </Card>
  );
}
