import StickyNoteCard from "@/components/shared/StickyNoteCard";
import { DraggableCardContainer } from "@/components/ui/draggable-card";
import { notes } from "@/constants";


export default function StickyNote() {
	return (
		<main className="max-w-7xl mx-auto p-6">
			<h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl mb-8">
				Sticky Notes
			</h1>
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
				{notes.map((note, index) => (
					<div
						key={index}
						className={`break-inside-avoid ${note.large ? "h-64" : "h-auto"}`}
					>
						<DraggableCardContainer  className="">
							<StickyNoteCard {...note} />
						</DraggableCardContainer>
					</div>
				))}
			</div>
		</main>
	);
}
