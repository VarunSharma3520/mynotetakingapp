"use client";

import { MultiStepLoader } from "@/components/ui/multi-step-loader";

export default function LoadingScreen() {
  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <MultiStepLoader
        loading={true}
        duration={1500}
        loop={false}
        loadingStates={[
          { text: "Initializing Notes App..." },
          { text: "Connecting to your server..." },
          { text: "Fetching your notes..." },
          { text: "Almost ready!" },
        ]}
      />
    </div>
  );
}
