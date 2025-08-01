"use client";

import { useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	Notebook,
	Clock,
	Calendar,
	Settings,
	LogOut,
	Plus,
	Search,
	Heart,
} from "lucide-react";

export default function NoteEditor() {
	const [search, setSearch] = useState("");

	const tags = ["Work", "Personal", "Ideas", "Goals"];

	const navLinks = [
		{ label: "All Notes", icon: Notebook },
		{ label: "Today", icon: Calendar },
		{ label: "Fav Diary Days", icon: Heart },
		{ label: "Recent Days", icon: Clock },
	];

	return (
		<div className="w-full min-h-screen bg-gray-100 dark:bg-neutral-900">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				{/* Sidebar */}
				<ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
					<div className="flex h-full flex-col border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
						{/* Search + New Note in One Line */}
						<div className="flex items-center gap-2 mb-6">
							{/* Search Bar */}
							<div className="flex flex-1 items-center gap-2 rounded-lg bg-gray-100 dark:bg-neutral-700 px-3 py-2 shadow-sm">
								<Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
								<input
									type="text"
									placeholder="Search..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="w-full bg-transparent text-sm outline-none dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
								/>
							</div>

							{/* New Note Button */}
							<button className="flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition">
								<Plus className="h-5 w-5" />
							</button>
						</div>

						{/* Navigation */}
						<div className="mb-6">
							{navLinks.map((link, idx) => (
								<button
									key={idx}
									className="flex w-full items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-md"
								>
									<link.icon className="h-4 w-4" /> {link.label}
								</button>
							))}
						</div>

						{/* Tags */}
						<div className="mb-6">
							<p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
								Tags
							</p>
							<div className="flex flex-wrap gap-2">
								{tags.map((tag, idx) => (
									<span
										key={idx}
										className="rounded-full bg-gray-200 dark:bg-neutral-700 px-3 py-1 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-neutral-600"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Utility Links */}
						<div className="mt-auto flex flex-col gap-2">
							<button className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-md">
								<Settings className="h-4 w-4" /> Settings
							</button>
							<button className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-md">
								<LogOut className="h-4 w-4" /> Logout
							</button>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle />

				{/* Main Editor */}
				<ResizablePanel defaultSize={75}>
					<div className="h-full p-6">
						<h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
							How Was Your Day ?
						</h1>
						<textarea
							placeholder="Start writing your thoughts..."
							className="w-full h-[85vh] p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
