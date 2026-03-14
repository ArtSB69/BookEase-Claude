import { redirect } from "next/navigation";

// Redirect signup to onboarding wizard
export default function SignupPage() {
  redirect("/merchant/onboarding");
}
