"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileTextIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

import { Button } from "../ui/button";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  type LoginInputProps = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputProps>();

  if (user?.role === "INDIVIDUAL") {
    router.push("/dashboard");
  } else {
    router.push("/dashboard");
  }

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("Attempting to sign in with credentials:", data);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
      });
      console.log("SignIn response:", result);
      toast.success("Logged in successfully!");
      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Sign-in was successful
        // Fetch user data to get the role
        // const userResponse = await fetch('/api/user');
        // const userData = await userResponse.json();
        // console.log("user data consoled",userData)
      }
    } catch (error) {
      console.error("Network Error:", error);
      setError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      toast.success("Login failed!");
    }
  }

  return (
    <div className="md:min-h-screen md:mt-8 mt-[80px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <motion.div
        className="bg-white rounded-lg  shadow-xl p-8 w-full md:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-8">
          <FileTextIcon className="h-10 w-10 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">DocStruct</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 transition duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 mt-2 bg-blue-700 text-white rounded-[5px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging you ..." : "Log in"}
          </Button>
        </form>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <div className="text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <hr className="my-6 border-gray-300" />
        <p className="text-center text-sm text-gray-600">
          Don't have an account?
          <Link href="/signup" className="text-blue-600 hover:underline ml-1">
            Sign up for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
