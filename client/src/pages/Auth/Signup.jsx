import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShinyButton } from "@/components/ui/shiny-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-5xl font-semibold text-foreground dark:text-foreground font-oddlini tracking-wider">
            Signup
          </h3>
          <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground font-oddlini-light tracking-wider">
            Enter your details to create account.
          </p>
          <form action="#" method="post" className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="email-login-03"
                className="text-sm font-medium text-foreground dark:text-foreground font-oddlini tracking-wider"
              >
                Name
              </Label>
              <Input
                type="name"
                id="email-login-03"
                name="email-login-03"
                autoComplete="email"
                placeholder="John Doe"
                className="mt-2 font-oddlini-light tracking-wider"
              />
            </div>
            <div>
              <Label
                htmlFor="email-login-03"
                className="text-sm font-medium text-foreground dark:text-foreground font-oddlini tracking-wider"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email-login-03"
                name="email-login-03"
                autoComplete="email"
                placeholder="johndoe@gmail.com"
                className="mt-2 font-oddlini-light tracking-wider"
              />
            </div>
            <div>
              <Label
                htmlFor="password-login-03"
                className="text-sm font-medium text-foreground dark:text-foreground font-oddlini tracking-wider"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password-login-03"
                  name="password-login-03"
                  autoComplete="password"
                  placeholder="**************"
                  className="mt-2 font-oddlini-light tracking-wider pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye-off SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-closed-icon lucide-eye-closed"
                    >
                      <path d="m15 18-.722-3.25" />
                      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                      <path d="m20 15-1.726-2.05" />
                      <path d="m4 15 1.726-2.05" />
                      <path d="m9 18 .722-3.25" />
                    </svg>
                  ) : (
                    // Eye SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-icon lucide-eye"
                    >
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <RainbowButton
              type="submit"
              className="mt-4 w-full py-2 font-oddlini tracking-wider"
            >
              SIGN UP
            </RainbowButton>
            <Link to="/login">
              <ShimmerButton className="w-full font-oddlini tracking-wider">
                SIGN IN
              </ShimmerButton>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
