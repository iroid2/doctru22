// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import {
//   FileTextIcon,
//   EyeIcon,
//   EyeOffIcon,
//   UserIcon,
//   MailIcon,
//   BuildingIcon,
//   Router,
// } from "lucide-react";
// import Link from "next/link";
// import { registerProps } from "@/Types/Types";
// import { createUser } from "@/actions/user";
// import { toast, Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// export default function SignupPage({ role }: { role: string }) {
//   const { register, handleSubmit, reset } = useForm<registerProps>();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();
//   async function onSubmit(data: registerProps) {
//     console.log(data);
//     data.role = role;
//     setIsSubmitting(true);
//     try {
//       const res = await createUser(data);
//       toast.success("User Registered successfully!");
//       setIsSubmitting(false);
//       reset();
//       router.push("/login");
//       return res;
//     } catch (error) {
//       console.log(error);
//       toast.success("User Registration Failed!");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 md:p-4">
//       <motion.div
//         className="bg-white rounded-lg md:mt-[80px] shadow-xl p-6 sm:p-8 w-full md:w-[50%]"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex items-center justify-center mb-6 sm:mb-8">
//           <FileTextIcon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mr-2" />
//           <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
//             DocStruct
//           </h1>
//         </div>
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800  text-center">
//           Create Your Account
//         </h2>
//         <form
//           className="space-y-4 sm:space-y-6"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className="relative">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               placeholder="John Doe"
//               {...register("fullName")}
//             />
//             <UserIcon
//               className="absolute left-3 top-9 text-gray-400"
//               size={18}
//             />
//           </div>
//           <div className="relative">
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               User Name
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               placeholder="eg: iroid"
//               {...register("username")}
//             />
//             <UserIcon
//               className="absolute left-3 top-9 text-gray-400"
//               size={18}
//             />
//           </div>
//           <div className="relative">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               placeholder="you@example.com"
//               {...register("email")}
//             />
//             <MailIcon
//               className="absolute left-3 top-9 text-gray-400"
//               size={18}
//             />
//           </div>
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               placeholder="Create a strong password"
//               {...register("password")}
//             />
//             <EyeIcon
//               className="absolute left-3 top-9 text-gray-400"
//               size={18}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition duration-200"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
//             </button>
//           </div>
//           <div className="relative">
//             <label
//               htmlFor="company"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Company (Optional)
//             </label>
//             <input
//               type="text"
//               id="company"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               placeholder="Your company name"
//               {...register("company")}
//             />
//             <BuildingIcon
//               className="absolute left-3 top-9 text-gray-400"
//               size={18}
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-6 py-3 mt-2 bg-blue-700 text-white rounded-[5px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {isSubmitting ? "Registering..." : "Register"}
//           </Button>
//         </form>
//         <Toaster
//           position="bottom-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: "#333",
//               color: "#fff",
//             },
//           }}
//         />
//         <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
//           By signing up, you agree to our
//           <a href="#" className="text-blue-600 hover:underline mx-1">
//             Terms
//           </a>
//           and
//           <a href="#" className="text-blue-600 hover:underline mx-1">
//             Privacy Policy
//           </a>
//         </p>
//         <hr className="my-6 border-gray-300" />
//         <p className="text-center text-sm text-gray-600">
//           Already have an account?
//           <Link href="/login" className="text-blue-600 hover:underline ml-1">
//             Log in
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
