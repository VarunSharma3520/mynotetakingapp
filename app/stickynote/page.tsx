"use client";

import StickyNoteCard from "@/components/shared/StickyNoteCard";
import { DraggableCardContainer } from "@/components/ui/draggable-card";
import { notes } from "@/constants";
import { useEffect, useState } from "react";

export default function StickyNote() {
	const [connectionUrl, setConnectionUrl] = useState<string | null>(null);

	useEffect(() => {
		const savedUrl = localStorage.getItem("connection-url");
		setConnectionUrl(savedUrl);
	}, []);

	return (
		<main className="max-w-7xl mx-auto p-6">
			{/* Optionally show a message if no connection URL */}
			{!connectionUrl && (
				<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
					{notes.map((note, index) => (
						<div
							key={index}
							className={`break-inside-avoid ${note.large ? "h-64" : "h-auto"}`}
						>
							<DraggableCardContainer>
								<StickyNoteCard {...note} />
							</DraggableCardContainer>
						</div>
					))}
				</div>
			)}
			{
				connectionUrl && (
					<div>hi</div>
				)
			}
		</main>
	);
}
