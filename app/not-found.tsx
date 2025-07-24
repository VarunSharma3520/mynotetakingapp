import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">404 | Not Found</h1>
        <p>The requested page could not be found.</p>
        <Button variant="default">Go Back</Button>
      </main>
    </div>
  );
}