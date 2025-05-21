"use client";

import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading..." }: { label?: string }) {
  console.log("loader loaded!....")
  return (
    <div className="flex flex-col bg-red-500 items-center justify-center min-h-screen text-gray-600">
      <Loader2 className="animate-spin w-8 h-8 mb-2" />
      <p className="text-sm">{label}</p>
    </div>
  );
}