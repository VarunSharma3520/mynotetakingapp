"use client";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import EditNote from "./EditNote";
import { StickyNoteCardProps } from "@/types";
import { DraggableCardBody } from "@/components/ui/draggable-card";

export default function StickyNoteCard({
	title,
	description,
	content,
	footer,
	// image,
	// video,
	// audio,
	cardBackgroundColor,
	cardBorderColor,
	cardTitleColor,
	cardContentColor,
	cardFooterColor,
	cardPosition,
}: StickyNoteCardProps) {
	return (
		<DraggableCardBody className={`${cardPosition} min-h-0 p-0`}>
			<Card className={`${cardBackgroundColor}`}>
				<CardHeader className={cardBorderColor}>
					<CardTitle className={cardTitleColor}>{title}</CardTitle>
					<CardDescription
						className={`${cardContentColor} line-clamp-3`}
					>
						{description}
					</CardDescription>
					<CardAction onClick={() => console.log("Card Action Clicked")}>
						<EditNote />
					</CardAction>	
				</CardHeader>
				<CardContent>
					<p className={`${cardContentColor} line-clamp-3`}>{content}</p>
				</CardContent>
				<CardFooter>
					<p className={cardFooterColor}>{footer}</p>
				</CardFooter>
			</Card>
		</DraggableCardBody>
	);
}
