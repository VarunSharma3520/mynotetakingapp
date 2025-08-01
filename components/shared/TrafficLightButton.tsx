"use client";
import { X, Plus } from "lucide-react";
import ConnectServer from "../others/ConnectServer";

export default function TrafficLightButton() {
	return (
		// macOS Window Header
		<div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-300">
			{/* Traffic Light Buttons */}
			<div className="flex gap-2">
				{/* Close (Red) */}
				<button
					onClick={() => {
						window.location.href = "/";
					}}
					className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-red-500"
				>
					<X className="absolute hidden h-2 w-2 text-white group-hover:block" />
				</button>

				{/* Minimize (Yellow) */}
				<button
					onClick={() => {
					}}
					className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500"
				>
					<ConnectServer />
				</button>

				{/* Maximize (Green) */}
				<button
					onClick={() => {
						// Alternatively, you can toggle fullscreen mode
						if (document.fullscreenElement) {
							document.exitFullscreen();
						} else {
							document.documentElement.requestFullscreen();
						}
					}}
					className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-green-500"
				>
					<Plus className="absolute hidden h-2 w-2 text-white group-hover:block" />
				</button>
			</div>

			<div className="flex-1 text-center text-sm text-gray-600">
				My Note Taking App
			</div>
		</div>
	);
}
