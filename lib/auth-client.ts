import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { resend } from "./resend";

export const authClient = createAuthClient({
  plugins: [emailOTPClient()],
});
