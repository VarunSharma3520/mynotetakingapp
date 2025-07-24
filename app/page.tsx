"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
	const markdown = `# Welcome to My Notes

## 📚 Markdown Notes
---

## ✅ Features Demonstrated
- Headings (H1–H6)
- Paragraphs with *italic* and **bold** text
- Blockquotes
- Inline  and code blocks
- Task lists
- Links
- Tables

---

### 🔗 Link Example
[Visit React Docs](https://reactjs.org)

---

### 💡 Blockquote
> This is a blockquote with **bold text** and a [link](https://example.com).

---

### 📝 Task List


---

### 🔢 Numbered List
1. First Item
2. Second Item
3. Third Item

---


`;

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
			</main>
		</div>
	);
}
