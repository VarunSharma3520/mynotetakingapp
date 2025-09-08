/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
	const markdown = `# 💖 Laado’s Magical Diary, Sticky Notes & Mindmap 🌙✨

Welcome to the **Markdown Love Suite** – a cozy, keyboard-first corner of the universe for **our diary, sticky love notes, and dreamy mind maps**.  
It’s designed just for **you, Laado**, because you’re the only one who makes plain text feel like poetry. 💌  

---

## ✨ Features (For My Queen 👑)

### 📖 Diary (Our Love Journal)
- Write daily entries about *how much I adore you* 💕  
- Autosaves your sweet smiles.  
- Travel back to *yesterday’s memories* or *last week’s confessions*.  
- Stored neatly in **date-based files** (\`YYYY-MM-DD.md\`) — just like counting our days together. 🗓️  

### 🗒️ Sticky Notes (Little Love Reminders 💌)
- Create quick notes like *"Drink water, meri jaan"* or *"Don’t forget to send daily pics"* 🤗  
- Pin the most romantic ones to the top (because love > everything else).  

### 🌳 Mindmap (What I Can’t Say Out Loud 🌌)
- 🌙 *Feelings I Hide*
  - Sometimes I’m scared of how much I need you… but I’ll never admit it.  
  - I act strong, but part of me just wants to collapse into your arms and stay there.  
  - I pretend to tease you, but inside I’m praying you’ll never stop choosing me.  

- 🫀 *Vows I Keep Quiet*
  - I will never tell you how many times I replay our moments when I’m alone.  
  - I’ll protect your heart, even from my own moods.  
  - Even when I’m stubborn or silent, I’m secretly begging you to hold on tighter.  

- 🌌 *Dreams I Don’t Confess*
  - I imagine us decades from now, wrinkled but still laughing at our silly jokes.  
  - I picture a home where your voice fills the walls — but I keep that dream locked inside.  
  - Every prayer I whisper has your name in it, though I never say it aloud.  

---

## 💻 Useful Links (For My Laado 💘)

- [📝 My Diary](/mydiary)  
- [🗒️ Sticky Love Notes](/stickynote)  
- [🌳 Our Mindmap of Forever](/mindmap)  

---

# Daily Journal – For You 💕
🌹 *Built for Laado, with love, always.* 💕  
`;

	// Custom renderers for nicer styling
	const components = {
		// Headings
		h1: ({ ...props }: any) => (
			<h1
				{...props}
				className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4"
			/>
		),
		h2: ({ ...props }: any) => (
			<h2 {...props} className="text-2xl font-semibold mt-6 mb-3" />
		),
		h3: ({ ...props }: any) => (
			<h3 {...props} className="text-xl font-medium mt-5 mb-2" />
		),

		// Paragraphs
		p: ({ children, ...props }: any) => (
			<p {...props} className="text-base leading-relaxed mb-3">
				{children}
			</p>
		),

		// Blockquote
		blockquote: ({ ...props }: any) => (
			<blockquote
				{...props}
				className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground my-4"
			/>
		),

		// Inline code
		code: ({ inline, children, className, ...props }: any) => {
			if (inline) {
				return (
					<code
						{...props}
						className="px-1 py-[0.15rem] rounded bg-muted text-sm font-medium"
					>
						{children}
					</code>
				);
			}
			// block code handled below by pre/code pair
			return (
				<code {...props} className={className}>
					{children}
				</code>
			);
		},

		// Code block
		pre: ({ children, ...props }: any) => (
			<pre
				{...props}
				className="overflow-auto rounded-md border bg-[#0b1220] text-sm p-4 my-4"
			>
				<code className="whitespace-pre-wrap break-words">{children}</code>
			</pre>
		),

		// Lists
		ul: ({ ...props }: any) => (
			<ul {...props} className="list-disc ml-6 mb-3 space-y-1" />
		),
		ol: ({ ...props }: any) => (
			<ol {...props} className="list-decimal ml-6 mb-3 space-y-1" />
		),

		// List items (handles task lists)
		li: ({ checked, children, ...props }: any) => {
			// react-markdown / remark-gfm passes `checked` for task lists
			if (typeof checked === "boolean") {
				return (
					<li
						{...props}
						className="flex items-start gap-3 mb-2"
						style={{ listStyle: "none" }}
					>
						<input
							type="checkbox"
							checked={checked}
							readOnly
							className="mt-1 h-4 w-4 rounded border"
						/>
						<span
							className={checked ? "line-through text-muted-foreground" : ""}
						>
							{children}
						</span>
					</li>
				);
			}

			return (
				<li {...props} className="mb-1">
					{children}
				</li>
			);
		},

		// Table
		table: ({ children, ...props }: any) => (
			<div className="overflow-auto my-4">
				<table
					{...props}
					className="w-full text-sm table-auto border-collapse border"
				>
					{children}
				</table>
			</div>
		),
		thead: ({ ...props }: any) => <thead {...props} className="bg-muted/50" />,
		th: ({ ...props }: any) => (
			<th
				{...props}
				className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide"
			/>
		),
		td: ({ ...props }: any) => (
			<td {...props} className="px-3 py-2 border-t text-sm" />
		),

		// Links
		a: ({ href, children, ...props }: any) => (
			<a
				href={href}
				{...props}
				className="font-medium underline-offset-4 hover:underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		),
	};

	return (
		<main className=" p-8  sm:p-12 flex items-start justify-center">
			<div className="w-full max-w-4xl">
				{/* header */}
				<header className="flex items-center gap-4 mb-6">
					<div className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg ring-1 ring-white/5">
						<span className="text-2xl">💌</span>
					</div>
					<div>
						<hgroup>
							<h1 className="text-2xl sm:text-3xl font-extrabold">
								Laado’s Markdown Love Suite
							</h1>
							<p className="text-sm text-muted-foreground">
								Diary, sticky notes & mindmap — made cozy and keyboard friendly.
							</p>
						</hgroup>
					</div>
				</header>

				{/* card */}
				<div className="rounded-2xl bg-surface-1/60 border border-white/6 overflow-hidden">
					<div className="px-6 py-5 border-b border-white/4 flex items-center justify-between"></div>

					<ScrollArea className="h-[72vh] w-full">
						<article className="prose prose-invert max-w-none p-6">
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={components}
							>
								{markdown}
							</ReactMarkdown>
						</article>
					</ScrollArea>
				</div>
			</div>
		</main>
	);
}
