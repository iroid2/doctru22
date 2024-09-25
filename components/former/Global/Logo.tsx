import { AirVent, FileTextIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
type LogoProps = {
  title?: string;
  href: string;
  labelShown?: boolean;
};
export default function Logo({ title, href, labelShown = true }: LogoProps) {
  return (
    <Link
      href={href}
      className="-m-1.5 p-1.5 flex items-center space-x-2 dark:text-slate-900"
    >
      <FileTextIcon className="h-8 w-8 text-blue-600" />
      <span className="ml-2 text-xl font-bold text-gray-800 font-sans">
        {title}
      </span>
    </Link>
  );
}
