"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Github } from "lucide-react";

// Schema for registration
const registerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Schema for login
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const partnerRegisterSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
});

export function AuthPage() {
  const { t } = useTranslation();
  const { type = "register" } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(type === "login");
  const [isPartnerRegister, setIsPartnerRegister] = useState(type === "partnerRegister");
  const { login, register: registerUser } = useAuth();
  const { toast } = useToast();

  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  // Update form type when URL changes
  useEffect(() => {
    setIsLogin(type === "login");
    setIsPartnerRegister(type === "partnerRegister");
  }, [type]);

  const form = useForm<
    | z.infer<typeof registerSchema>
    | z.infer<typeof loginSchema>
    | z.infer<typeof partnerRegisterSchema>
  >({
    resolver: zodResolver(
      isLogin ? loginSchema : isPartnerRegister ? partnerRegisterSchema : registerSchema
    ),
    defaultValues: {
      email: "",
      password: "",
      ...(isLogin ? {} : { firstName: "", lastName: "" }),
      ...(isPartnerRegister ? { companyName: "", phoneNumber: "" } : {}),
    },
  });

  async function onSubmit(values: any) {
    try {
      if (isLogin) {
        await login(values.email, values.password);
        toast({
          title: t("profile.welcome"),
          description: "You have successfully logged in.",
        });
      } else {
        await registerUser({
          ...values,
          role: isPartnerRegister ? "partner" : "candidate",
        });
        toast({
          title: t("profile.account"),
          description: `You have successfully registered as a ${isPartnerRegister ? "partner" : "candidate"}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {isLogin
              ? "Welcome Back"
              : isPartnerRegister
                ? "Register as Partner"
                : "Create an Account"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin
              ? "Enter your credentials to access your account"
              : isPartnerRegister
                ? "Register your company and start posting opportunities"
                : "Fill in your details to get started"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.first")}</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.last")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {isPartnerRegister && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.company")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("profile.phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.password")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : isPartnerRegister ? "Register as Partner" : "Create Account"}
            </Button>
          </form>
        </Form>

        {!isLogin && !isPartnerRegister && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/auth/partnerRegister")}
            >
              {t("profile.register")}
            </Button>
          </div>
        )}

        {type !== "partnerRegister" && (
          <>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground"> {t("profile.con")}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Github Sign In")}
              disabled
            >
              <Github className="mr-2 h-4 w-4" />
              {t("profile.continue")}
          
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Google Sign In")}
              disabled
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t("profile.google")}
            </Button>
          </>
        )}

        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={() => {
              if (isPartnerRegister) {
                navigate("/auth/register");
              } else {
                navigate(`/auth/${isLogin ? "register" : "login"}`);
              }
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : isPartnerRegister
                ? "Register as Candidate Instead"
                : "Already have an account? Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
}
