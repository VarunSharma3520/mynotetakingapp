"use client";

import dynamic from "next/dynamic";

// Dynamically import Excalidraw without SSR
const Excalidraw = dynamic(
	async () => (await import("@excalidraw/excalidraw")).Excalidraw,
	{ ssr: false }
);

export default function Minimap() {
  	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (elements: any, appState: any, files: any) => {
		console.log("Elements:", elements);
		console.log("App State:", appState);
		console.log("Files:", files);

		// You can also log specific data
		console.log("Number of elements:", elements.length);
		console.log("Zoom level:", appState.zoom.value);
		console.log("View background color:", appState.viewBackgroundColor);
	};
	return (
		<main className="flex min-h-[80vh] items-center justify-center">
			<div className="w-full h-[80vh]">
				<Excalidraw
					onChange={handleChange}
					initialData={{
						elements: [],
						appState: { viewBackgroundColor: "#ffffff", gridModeEnabled: true, openSidebar: false },
						files: {},
					}}
				/>
			</div>
		</main>
	);
}
