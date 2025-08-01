"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plug } from "lucide-react";

export default function ConnectServer() {
	const [open, setOpen] = useState(false);
	const [serverUrl, setServerUrl] = useState("");

	const handleConnect = () => {
		if (serverUrl.trim() !== "") {
			localStorage.setItem("connection-url", serverUrl);
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Minus className="absolute hidden h-2 w-2 text-white group-hover:block" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-md" showCloseButton>
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">
						Connect Your Notes Server
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Enter your server URL to access notes for your devices.
					</DialogDescription>
				</DialogHeader>
				<div className="flex mt-6 w-full max-w-md">
					<Input
						placeholder="https://www.example.com/api"
						value={serverUrl}
						onChange={(e) => setServerUrl(e.target.value)}
						className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
					<Button onClick={handleConnect} className="rounded-l-none">
						<Plug className="h-4 w-4 rotate-45" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
