import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

export default function EditNote() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="bg-transparent border-0 shadow-none hover:bg-transparent rounded-full "
				>
					<EllipsisVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>This Note</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Share
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Archive Note
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Set Reminder
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Pin Note
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Edit Note</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuSubTrigger>Note Customize</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Background Color</DropdownMenuItem>
								<DropdownMenuItem>Border Color</DropdownMenuItem>
								<DropdownMenuItem>Title Color</DropdownMenuItem>
								<DropdownMenuItem>Content Color</DropdownMenuItem>
								<DropdownMenuItem>Footer Color</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Edit Position</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Tag</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Code</DropdownMenuItem>
							<DropdownMenuItem>Note</DropdownMenuItem>
							<DropdownMenuItem>Research</DropdownMenuItem>
							<DropdownMenuItem>Life</DropdownMenuItem>
							<DropdownMenuItem>Mine</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuItem>Set Password</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Delete Note
					<DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
