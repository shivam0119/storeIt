"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z
            .string()
            .min(2, "Full name must be at least 2 characters")
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
              role:"user",
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    }  catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Auth error:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8 !important"
        >
          <h1 className="text-[34px] leading-[42px] font-bold text-center text-light-100 md:text-left !important">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          {type === "sign-up" && (
            <>
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                      <FormLabel className="text-light-100 pt-2 body-2 w-full !important">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="border-none shadow-none p-0 outline-none bg-transparent"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-600 ml-4" />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                  <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full !important">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-none shadow-none p-0 outline-none bg-transparent"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[#FF7474] ml-4" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-[#FA7275] hover:bg-[#EA6365] transition-all rounded-full button !important h-[66px] !important"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="body-2 mx-auto w-fit rounded-xl bg-[#b80000]/5 px-8 py-4 text-center text-error !important">
              *{errorMessage}
            </p>
          )}

          {/* Switch link */}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-[#FA7275]"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP Modal */}
      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
