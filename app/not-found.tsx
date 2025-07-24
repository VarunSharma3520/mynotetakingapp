"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-[80vh] items-center justify-center">
      <div className="border border-red-500 p-6 rounded-md text-center">
        <h1 className="text-2xl font-bold mb-2">404 | Not Found</h1>
        <p className="mb-4">Select any of the options below:</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.push("/noteEditor")}>
            Note Editor
          </Button>
          <Button variant="outline" onClick={() => router.push("/profile")}>
            Profile
          </Button>
          <Button variant="outline" onClick={() => router.push("/stickynote")}>
            Sticky Notes
          </Button>
        </div>
      </div>
    </main>
  );
}
