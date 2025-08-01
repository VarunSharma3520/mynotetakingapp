"use client";

import { useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	Notebook,
	Clock,
	Calendar,
	Search,
	Heart,
} from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function NoteEditor() {
	const [search, setSearch] = useState("");
	const [content, setContent] = useState("");
	const [sidebarSize, setSidebarSize] = useState(25);
	const tags = ["Work", "Personal", "Ideas", "Goals"];
	const handleDiaryWriting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};
	const navLinks = [
		{ label: "All Notes", icon: Notebook },
		{ label: "Today", icon: Calendar },
		{ label: "Favorite Diary Days", icon: Heart },
		{ label: "Recent Days", icon: Clock },
	];

	const words = [
		{
			text: "How",
			className: "text-2xl",
		},
		{
			text: "was",
			className: "text-2xl",
		},
		{
			text: "your",
			className: "text-2xl",
		},
		{
			text: "day,",
			className: "text-2xl",
		},
		{
			text: "Ladao.......?",
			className: "text-blue-600 dark:text-blue-600 text-2xl",
		},
	];

	return (
		<div className="w-full min-h-screen bg-white dark:bg-neutral-900">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				{/* Sidebar */}
				<ResizablePanel
					defaultSize={25}
					minSize={5}
					maxSize={35}
					onResize={(size) => setSidebarSize(size)}
				>
					<div className="flex h-full flex-col border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
						{/* Search + New Note in One Line */}
						<div className="flex items-center gap-2 mb-6">
							{/* Search Bar */}
							{sidebarSize > 8 && (
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
							)}

							{/* New Note Button */}
							{/* <button className="flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition">
								<Plus className="h-5 w-5" />
							</button> */}
						</div>

						{/* Navigation */}
						<div className="mb-6">
							{navLinks.map((link, idx) => (
								<button
									key={idx}
									className="flex w-full items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-md justify-start"
								>
									<link.icon className="h-4 w-4" />
									{sidebarSize > 8 && <span>{link.label}</span>}
								</button>
							))}
						</div>

						{/* Tags */}
						{sidebarSize > 8 && (
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
						)}
					</div>
				</ResizablePanel>

				<ResizableHandle />

				{/* Main Editor */}
				<ResizablePanel defaultSize={75}>
					<div className="h-full p-6">
						<TypewriterEffectSmooth className="-mt-6 -mb-0.5" cursorClassName="h-2" words={words} />
						<div className="flex gap-6 justify-between dark:bg-neutral-900 min-h-screen">
							<div className="flex w-full max-w-7xl mx-auto gap-6 rounded-xl dark:bg-neutral-800">
								{/* Left: Textarea */}
								<textarea
									placeholder="Start writing your thoughts..."
									onChange={handleDiaryWriting}
									value={content}
									className="w-1/2 h-[70vh] p-4 rounded-lg  border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-transparent shadow-inner custom-scrollbar"
								/>

								{/* Right: Markdown Preview */}
								<div className="w-1/2 h-[70vh] p-6 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 overflow-y-auto prose dark:prose-invert custom-scrollbar markdown">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{content || "👈 Start typing to preview your note here..."}
									</ReactMarkdown>
								</div>
							</div>
						</div>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
