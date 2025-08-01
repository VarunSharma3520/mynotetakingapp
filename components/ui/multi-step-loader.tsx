"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// ✅ Check Icon (Outline)
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={cn("w-6 h-6", className)}
  >
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// ✅ Check Icon (Filled)
const CheckFilled = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

// ✅ Type for loading states
type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex flex-col mt-40 max-w-xl mx-auto relative">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className="text-left flex gap-2 mb-4"
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <CheckIcon className="text-gray-400 dark:text-gray-600" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-gray-500 dark:text-white",
                    value === index &&
                      "text-lime-500 dark:text-lime-400 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-gray-700 dark:text-gray-200 font-medium",
                value === index && "text-lime-500 dark:text-lime-400"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading = false,
  duration = 2000,
  loop = true,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentState((prev) =>
        loop
          ? prev === loadingStates.length - 1
            ? 0
            : prev + 1
          : Math.min(prev + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [loading, currentState, loadingStates.length, duration, loop]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-black/20"
        >
          <div className="h-96 relative">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
