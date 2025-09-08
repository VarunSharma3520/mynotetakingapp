"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Notebook, Clock, Calendar, Search, Menu } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ---- util: formatDisplayDate used in multiple places (hoisted) ---- */
function formatDisplayDate(isoDate: string) {
	try {
		const d = new Date(isoDate + "T00:00:00");
		return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
	} catch {
		return isoDate;
	}
}

/* ---- types ---- */
type RecentNote = {
	date: string; // YYYY-MM-DD
	content: string;
	excerpt: string;
	exists: boolean;
};

/* ---- small saved badge with ping animation ---- */
function SavedBadge() {
	return (
		<div className="relative flex items-center justify-center w-6 h-6">
			{/* ping circle */}
			<span className="absolute inline-flex h-6 w-6 rounded-full bg-green-400 opacity-75 animate-ping" />
			{/* solid circle */}
			<span className="absolute inline-flex h-4 w-4 rounded-full bg-green-500" />
			{/* checkmark */}
			<svg
				className="relative w-3 h-3 text-white"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden
			>
				<path
					d="M5 12.5l4 4L19 7.5"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

/* ---- RecentCard (small presentational component) ---- */
function RecentCard({
	note,
	onClick,
}: {
	note: RecentNote;
	onClick: (date: string) => void;
}) {
	return (
		<article
			role="button"
			tabIndex={0}
			onClick={() => onClick(note.date)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onClick(note.date);
			}}
			className={`cursor-pointer rounded-md p-3 border transition-colors ${
				note.exists
					? "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
					: "border-dashed border-gray-300 dark:border-neutral-800 text-gray-400 bg-transparent"
			}`}
		>
			<div className="flex items-center justify-between">
				<div className="text-sm font-medium">
					{formatDisplayDate(note.date)}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400">
					{note.exists ? "Has entry" : "Empty"}
				</div>
			</div>
			<div className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
				{note.excerpt || "No content for this day."}
			</div>
		</article>
	);
}

/* ---- RecentList (scrollable list of RecentCard) ---- */
function RecentList({
	notes,
	onLoadDay,
}: {
	notes: RecentNote[];
	onLoadDay: (date: string) => void;
}) {
	const listRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!listRef.current) return;
		try {
			listRef.current.scrollTo({ top: 0, behavior: "smooth" });
		} catch {
			listRef.current.scrollTop = 0;
		}
	}, [notes]);

	if (!notes || notes.length === 0) {
		return (
			<div className="p-2 text-xs text-gray-500 dark:text-gray-400">
				No recent entries
			</div>
		);
	}

	return (
		<div ref={listRef} tabIndex={-1} className="p-2 space-y-2">
			{notes.map((n) => (
				<RecentCard key={n.date} note={n} onClick={onLoadDay} />
			))}
		</div>
	);
}

/* ---- Sidebar component (includes search, nav, recent area) ---- */
function Sidebar({
	sidebarSize,
	search,
	onSearchChange,
	status,
	lastSavedAt,
	selectedNav,
	setSelectedNav,
	handleNavClick,
	recentNotes,
	handleLoadDay,
	onCloseMobile,
}: {
	sidebarSize: number;
	search: string;
	onSearchChange: (s: string) => void;
	status: string | null;
	lastSavedAt: string | null;
	selectedNav: string;
	setSelectedNav: (s: string) => void;
	handleNavClick: (label: string) => void;
	recentNotes: RecentNote[];
	handleLoadDay: (d: string) => void;
	onCloseMobile?: () => void;
}) {
	const navLinks = [
		{ label: "All Notes", icon: Notebook },
		{ label: "Today", icon: Calendar },
		{ label: "Recent Days", icon: Clock },
	];

	const renderSearchOrStatus = () => {
		if (status && status.startsWith("error")) {
			return (
				<div className="flex flex-1 items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 px-3 py-2">
					<span className="text-sm text-rose-700 dark:text-rose-300">
						Save error
					</span>
				</div>
			);
		}

		if (status === "saving") {
			return (
				<div className="flex flex-1 items-center gap-2 rounded-lg bg-gray-100 dark:bg-neutral-700 px-3 py-2">
					<span className="text-sm text-gray-600 dark:text-gray-200">
						Saving…
					</span>
				</div>
			);
		}

		// saved state shows green tick with ping on the right
		if (status === "saved") {
			return (
				<div className="flex items-center justify-between gap-2 rounded-lg bg-gray-100 dark:bg-neutral-700 px-3 py-2">
					<div className="text-sm text-gray-700 dark:text-gray-200">Saved</div>
					<SavedBadge />
				</div>
			);
		}

		return (
			<div className="flex flex-1 items-center gap-2 my-2 rounded-lg bg-gray-100 dark:bg-neutral-700 px-3 py-2">
				<Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
				<input
					type="text"
					placeholder="Search with date & feelings..."
					value={search}
					onChange={(e) => {
						onSearchChange(e.target.value);
						setSelectedNav("All Notes");
					}}
					className="w-full bg-transparent text-sm outline-none dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
					aria-label="Search notes"
				/>
			</div>
		);
	};

	// compact mode when sidebar is collapsed (<= 8)
	if (sidebarSize <= 8) {
		return (
			<div className="flex h-full flex-col items-center border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 py-3 space-y-2">
				{/* Search icon with small badge when saved */}
				<button
					className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
					title="Search"
				>
					<Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
				</button>

				{/* nav icons stacked */}
				{navLinks.map((link, idx) => {
					const Icon = link.icon;
					return (
						<button
							key={idx}
							onClick={() => {
								setSelectedNav(link.label);
								handleNavClick(link.label);
								onCloseMobile?.();
							}}
							className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 ${
								selectedNav === link.label
									? "bg-gray-100 dark:bg-neutral-800"
									: ""
							}`}
							title={link.label}
						>
							<Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
						</button>
					);
				})}
			</div>
		);
	}

	// default (expanded) sidebar
	return (
		<div className="flex h-full flex-col border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
			<div className="flex flex-col gap-1 mb-4">
				<div>{sidebarSize > 8 && renderSearchOrStatus()}</div>
				<div className="h-4">
					{sidebarSize > 8 && status === "saved" && lastSavedAt && (
						<div className="text-xs text-green-500 dark:text-green-400">
							Saved • {new Date(lastSavedAt).toLocaleTimeString()}
						</div>
					)}
				</div>
			</div>

			<div className="mb-4 space-y-2">
				{navLinks.map((link, idx) => {
					const Icon = link.icon;
					return (
						<button
							key={idx}
							onClick={() => {
								setSelectedNav(link.label);
								handleNavClick(link.label);
								onCloseMobile?.();
							}}
							className={`flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md justify-start transition-colors ${
								selectedNav === link.label
									? "bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
									: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
							}`}
						>
							<Icon className="h-5 w-5" />
							<span className="truncate">{link.label}</span>
						</button>
					);
				})}
			</div>

			{/* Recent list: small scroll area */}
			{selectedNav === "Recent Days" && sidebarSize > 8 && (
				<div className="flex-1 min-h-0">
					<ScrollArea className="max-h-56 rounded-md pr-2">
						<RecentList notes={recentNotes} onLoadDay={handleLoadDay} />
					</ScrollArea>
				</div>
			)}

			{/* if RecentDays not selected show small hint / compact recent snapshot */}
			{selectedNav !== "Recent Days" && sidebarSize > 8 && (
				<div className="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
					<div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
						Recent
					</div>
					<div className="space-y-2">
						{recentNotes.slice(0, 3).map((n) => (
							<div
								key={n.date}
								onClick={() => handleLoadDay(n.date)}
								role="button"
								tabIndex={0}
								className="text-sm text-left cursor-pointer rounded px-2 py-1 hover:bg-gray-50 dark:hover:bg-neutral-800"
							>
								<div className="flex items-center justify-between">
									<div className="truncate">{formatDisplayDate(n.date)}</div>
									<div className="text-xs text-gray-400">
										{n.exists ? "Has" : "Empty"}
									</div>
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
									{n.excerpt}
								</div>
							</div>
						))}
						{recentNotes.length === 0 && (
							<div className="text-xs text-gray-500 dark:text-gray-400">
								No recent
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

/* ---- Main exported component (single-file composition) ---- */
export default function NoteEditor() {
	const [search, setSearch] = useState("");
	const [content, setContent] = useState("");
	const [sidebarSize, setSidebarSize] = useState(25);
	const [status, setStatus] = useState<string | null>(null);
	const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
	const [selectedNav, setSelectedNav] = useState<string>("Today");
	const [recentNotes, setRecentNotes] = useState<RecentNote[]>([]);
	const [currentDate, setCurrentDate] = useState<string>(() =>
		new Date().toISOString().slice(0, 10)
	); // YYYY-MM-DD

	// pagination / all notes
	const [allNotes, setAllNotes] = useState<RecentNote[]>([]);
	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(8);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loadingAll, setLoadingAll] = useState<boolean>(false);

	// mobile sidebar visibility
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

	// helpers / refs
	const debounceRef = useRef<number | null>(null); // for autosave
	const firstRenderRef = useRef(true);
	const savingRef = useRef(false);
	const abortRef = useRef<AbortController | null>(null);

	// debounce for All-Notes search
	const searchDebounceRef = useRef<number | null>(null);

	const todayStr = new Date().toISOString().slice(0, 10);
	const isEditable = currentDate === todayStr;

	const handleDiaryWriting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const getBase = () => {
		const raw = localStorage.getItem("connection-url");
		return (raw || "http://localhost:8000/").replace(/\/$/, "");
	};

	const fetchNote = async (date?: string) => {
		try {
			const base = getBase();
			const dateStr =
				date ?? currentDate ?? new Date().toISOString().slice(0, 10);
			const url = `${base}/api/v1/diary/${dateStr}`;
			const res = await axios.get(url, {
				headers: { "Content-Type": "application/json" },
				validateStatus: () => true,
			});

			if (res.status >= 200 && res.status < 300 && res.data?.data) {
				setContent(res.data.data.content || "");
			} else {
				setContent("");
			}

			setCurrentDate(dateStr);
		} catch (err: any) {
			if (date && err?.response?.status === 404) {
				setContent("");
				setCurrentDate(date);
				return;
			}
			console.error("fetchNote error:", err);
		}
	};

	const saveNote = async () => {
		if (!isEditable) return;
		try {
			if (abortRef.current) {
				abortRef.current.abort();
				abortRef.current = null;
			}
			const controller = new AbortController();
			abortRef.current = controller;
			savingRef.current = true;
			setStatus("saving");

			const base = getBase();
			const dateStr = todayStr;
			const url = `${base}/api/v1/diary/${dateStr}`;

			const payload = { content, createdAt: new Date().toISOString() };

			const res = await axios.post(url, payload, {
				headers: { "Content-Type": "application/json" },
				signal: controller.signal,
				timeout: 15000,
			});

			if (res.status >= 200 && res.status < 300) {
				setStatus("saved");
				setLastSavedAt(new Date().toISOString());
			} else {
				setStatus(`error: ${res.status} ${res.statusText}`);
			}

			abortRef.current = null;
			savingRef.current = false;

			window.setTimeout(() => {
				if (!savingRef.current) setStatus(null);
			}, 2500);
		} catch (err: any) {
			if (err?.code === "ERR_CANCELED") {
				savingRef.current = false;
				return;
			}
			console.error("saveNote error:", err);
			setStatus(`error: ${err?.message || err}`);
			savingRef.current = false;
			abortRef.current = null;
		}
	};

	const fetchRecentNotes = async (count = 8) => {
		try {
			const base = getBase();
			const url = `${base}/api/v1/diary`;
			const res = await axios.get(url, {
				headers: { "Content-Type": "application/json" },
				params: { page: 1, limit: count },
				validateStatus: () => true,
				timeout: 10000,
			});

			if (
				res.status >= 200 &&
				res.status < 300 &&
				Array.isArray(res.data?.data)
			) {
				const notes: RecentNote[] = res.data.data.map((item: any) => {
					const date = item.title ?? item.date ?? "";
					const c: string = item.content ?? "";
					return {
						date,
						content: c,
						excerpt: c.length > 120 ? c.slice(0, 117) + "..." : c,
						exists: Boolean(c && c.length > 0),
					} as RecentNote;
				});

				setRecentNotes(notes);
			} else {
				setRecentNotes([]);
			}
		} catch (err) {
			console.error("fetchRecentNotes error:", err);
			setRecentNotes([]);
		}
	};

	const fetchAllNotes = async (p = 1, q?: string) => {
		try {
			setLoadingAll(true);
			const base = getBase();
			const url = `${base}/api/v1/diary`;
			const params: any = { page: p, limit };
			if (q && q.trim().length) params.q = q.trim();

			const res = await axios.get(url, {
				headers: { "Content-Type": "application/json" },
				params,
				validateStatus: () => true,
				timeout: 10000,
			});

			if (
				res.status >= 200 &&
				res.status < 300 &&
				Array.isArray(res.data?.data)
			) {
				const notes: RecentNote[] = res.data.data.map((item: any) => {
					const date = item.title ?? item.date ?? "";
					const c: string = item.content ?? "";
					return {
						date,
						content: c,
						excerpt: c.length > 120 ? c.slice(0, 117) + "..." : c,
						exists: Boolean(c && c.length > 0),
					} as RecentNote;
				});

				setAllNotes(notes);
				const total = res.data?.meta?.total ?? notes.length;
				const tPages = Math.max(1, Math.ceil(total / limit));
				setTotalPages(tPages);
				setPage(p);
			} else {
				setAllNotes([]);
				setTotalPages(1);
				setPage(1);
			}
		} catch (err) {
			console.error("fetchAllNotes error:", err);
			setAllNotes([]);
			setTotalPages(1);
			setPage(1);
		} finally {
			setLoadingAll(false);
		}
	};

	useEffect(() => {
		fetchNote(todayStr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// autosave effect for today's diary
	useEffect(() => {
		if (!isEditable) return;
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		if (debounceRef.current) window.clearTimeout(debounceRef.current);

		debounceRef.current = window.setTimeout(() => {
			saveNote();
			debounceRef.current = null;
		}, 1500);

		return () => {
			if (debounceRef.current) {
				window.clearTimeout(debounceRef.current);
				debounceRef.current = null;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [content, isEditable]);

	// handle changes to the sidebar search input.
	// Debounced and triggers fetchAllNotes if user is on "All Notes".
	const onSidebarSearchChange = (val: string) => {
		setSearch(val);

		if (searchDebounceRef.current) {
			window.clearTimeout(searchDebounceRef.current);
		}

		searchDebounceRef.current = window.setTimeout(() => {
			if (selectedNav === "All Notes") {
				fetchAllNotes(1, val);
			}
			setPage(1);
			searchDebounceRef.current = null;
		}, 450);
	};

	useEffect(() => {
		return () => {
			if (searchDebounceRef.current)
				window.clearTimeout(searchDebounceRef.current);
			if (debounceRef.current) window.clearTimeout(debounceRef.current);
		};
	}, []);

	const handleNavClick = (label: string) => {
		setSelectedNav(label);
		if (label === "Today") {
			fetchNote(todayStr);
		} else if (label === "Recent Days") {
			fetchRecentNotes(8);
		} else if (label === "All Notes") {
			fetchAllNotes(1, search);
		}

		// close mobile sidebar if open
		setMobileSidebarOpen(false);
	};

	// clicking a card opens diary in main view (view-mode for past)
	const handleCardClick = async (dateStr: string) => {
		await fetchNote(dateStr);
		setSelectedNav("Today");
		setMobileSidebarOpen(false);
	};

	const handleLoadDay = (dateStr: string) => {
		handleCardClick(dateStr);
	};

	const handleBackToToday = () => {
		fetchNote(todayStr);
		setSelectedNav("Today");
	};

	const goToPage = (p: number) => {
		if (p < 1 || p > totalPages) return;
		fetchAllNotes(p, search);
	};

	const words = [
		{ text: "How", className: "text-2xl" },
		{ text: "was", className: "text-2xl" },
		{ text: "your", className: "text-2xl" },
		{ text: "day,", className: "text-2xl" },
		{
			text: "Laado.......?",
			className: "text-blue-600 dark:text-blue-400 text-2xl",
		},
	];

	return (
		<div className="w-full min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
			{/* Mobile top bar with toggle */}
			<div className="md:hidden flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
				<div className="flex items-center gap-2">
					<button
						onClick={() => setMobileSidebarOpen(true)}
						aria-label="Open sidebar"
						className="p-2 rounded-md bg-gray-100 dark:bg-neutral-800"
					>
						<Menu className="w-5 h-5" />
					</button>
					<div className="text-sm font-semibold">Diary</div>
				</div>

				<div className="text-xs text-gray-500 dark:text-gray-400">
					{selectedNav === "All Notes"
						? "All Notes"
						: isEditable
						? "Today (editable)"
						: formatDisplayDate(currentDate)}
				</div>
			</div>

			{/* Mobile sidebar overlay */}
			{mobileSidebarOpen && (
				<div className="md:hidden fixed inset-0 z-50">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={() => setMobileSidebarOpen(false)}
					/>
					<div className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-neutral-900">
						<Sidebar
							sidebarSize={25}
							search={search}
							onSearchChange={onSidebarSearchChange}
							status={status}
							lastSavedAt={lastSavedAt}
							selectedNav={selectedNav}
							setSelectedNav={setSelectedNav}
							handleNavClick={handleNavClick}
							recentNotes={recentNotes}
							handleLoadDay={handleLoadDay}
							onCloseMobile={() => setMobileSidebarOpen(false)}
						/>
					</div>
				</div>
			)}

			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-screen md:flex"
			>
				{/* Sidebar visible on md+ */}
				<ResizablePanel
					defaultSize={25}
					minSize={5}
					maxSize={35}
					onResize={(s) => setSidebarSize(s)}
					className="hidden md:block"
				>
					<Sidebar
						sidebarSize={sidebarSize}
						search={search}
						onSearchChange={onSidebarSearchChange}
						status={status}
						lastSavedAt={lastSavedAt}
						selectedNav={selectedNav}
						setSelectedNav={setSelectedNav}
						handleNavClick={handleNavClick}
						recentNotes={recentNotes}
						handleLoadDay={handleLoadDay}
					/>
				</ResizablePanel>

				<ResizableHandle />

				<ResizablePanel defaultSize={75}>
					<div className="h-full p-6">
						{/* typewriter hides when All Notes */}
						{selectedNav !== "All Notes" && (
							<TypewriterEffectSmooth
								className="-mt-6 -mb-0.5"
								cursorClassName="h-2"
								words={words}
							/>
						)}

						<div className="flex flex-col md:flex-row gap-6 justify-between dark:bg-neutral-900 min-h-screen">
							<div className="flex flex-col w-full max-w-7xl mx-auto gap-6 rounded-xl dark:bg-transparent">
								{/* ALL NOTES */}
								{selectedNav === "All Notes" ? (
									<div className="w-full">
										<div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<h2 className="text-lg font-semibold">All Notes</h2>

											<div className="flex items-center gap-2">
												<div className="text-sm text-gray-500 dark:text-gray-400">
													{loadingAll
														? "Loading…"
														: `Page ${page} / ${totalPages}`}
												</div>
											</div>
										</div>

										<div className="rounded-lg border border-gray-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900">
											<ScrollArea className="max-h-[60vh] sm:max-h-[70vh]">
												<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
													{allNotes.length === 0 && !loadingAll ? (
														<div className="col-span-full text-sm text-gray-500 dark:text-gray-400">
															No notes found.
														</div>
													) : (
														allNotes.map((n) => (
															<div
																key={n.date}
																onClick={() => handleCardClick(n.date)}
																role="button"
																tabIndex={0}
																onKeyDown={(e) => {
																	if (e.key === "Enter" || e.key === " ")
																		handleCardClick(n.date);
																}}
																className="cursor-pointer rounded-md p-4 border border-gray-100 dark:border-neutral-800 hover:bg-gray-100 transition-colors bg-gray-50 dark:bg-neutral-900"
															>
																<div className="flex items-center justify-between">
																	<div className="font-medium">
																		{formatDisplayDate(n.date)}
																	</div>
																	<div className="text-xs text-gray-500 dark:text-gray-400">
																		{n.exists ? "Has entry" : "Empty"}
																	</div>
																</div>
																<div className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
																	{n.excerpt || "No content"}
																</div>
															</div>
														))
													)}
												</div>
											</ScrollArea>

											{/* pagination */}
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center gap-2">
													<button
														onClick={() => goToPage(page - 1)}
														disabled={page <= 1 || loadingAll}
														className="px-3 py-1 rounded bg-gray-100 dark:bg-neutral-800 text-sm disabled:opacity-40"
													>
														Prev
													</button>
													<button
														onClick={() => goToPage(page + 1)}
														disabled={page >= totalPages || loadingAll}
														className="px-3 py-1 rounded bg-gray-100 dark:bg-neutral-800 text-sm disabled:opacity-40"
													>
														Next
													</button>
												</div>

												<div className="text-sm text-gray-500 dark:text-gray-400">
													{loadingAll ? "Loading…" : `${page} / ${totalPages}`}
												</div>
											</div>
										</div>
									</div>
								) : (
									/* EDITOR / VIEW */
									<div className="w-full flex flex-col md:flex-row gap-6">
										{/* Textarea stacks on small screens: full width; on md uses half width */}
										{isEditable ? (
											<>
												<textarea
													placeholder="Start writing your thoughts..."
													onChange={handleDiaryWriting}
													value={content}
													className="w-full md:w-1/2 h-[60vh] md:h-[70vh] p-4 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-transparent shadow-inner custom-scrollbar"
												/>
												<div className="w-full md:w-1/2 h-[60vh] md:h-[70vh] px-4 py-4 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-100 overflow-y-auto prose dark:prose-invert custom-scrollbar markdown bg-white dark:bg-neutral-900">
													<ReactMarkdown remarkPlugins={[remarkGfm]}>
														{content ||
															"👈 Start typing to preview your note here..."}
													</ReactMarkdown>
												</div>
											</>
										) : (
											<div className="w-full">
												<div className="w-full flex flex-col h-[60vh] md:h-[70vh] rounded-lg border border-gray-300 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900">
													<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900">
														<div className="text-sm font-medium">
															Viewing • {formatDisplayDate(currentDate)}
														</div>
														<div className="flex items-center gap-2">
															<button
																onClick={handleBackToToday}
																className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
															>
																Back to Today
															</button>
														</div>
													</div>

													<div className="p-4 overflow-y-auto prose dark:prose-invert custom-scrollbar">
														{content ? (
															<ReactMarkdown remarkPlugins={[remarkGfm]}>
																{content}
															</ReactMarkdown>
														) : (
															<div className="text-sm text-gray-500 dark:text-gray-400">
																No entry for this day.
															</div>
														)}
													</div>
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
