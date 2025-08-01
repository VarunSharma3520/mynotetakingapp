"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [selected, setSelected] = useState<string>("stickynote");
  const router = useRouter();

  const handleViewChange = (value: string) => {
    setSelected(value);
    router.push(`/${value}`);
  };

  const externalLinks = [
    { href: "https://www.linkedin.com/in/varun3520/", label: "LinkedIn" },
    { href: "https://github.com/VarunSharma3520", label: "GitHub" },
    { href: "https://portfoliovarun.netlify.app/", label: "Portfolio" },
  ];

  return (
    <nav className="bg-white	">
      <Menubar className="rounded-none py-2 flex">
        {/* File Menu */}
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Write Daily Diary <MenubarShortcut>⌘⇧D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open Diary <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open Mind Map <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Mind Map <MenubarShortcut>⌘⇧A</MenubarShortcut>
            </MenubarItem>

            <MenubarSeparator />

            {/* Submenu */}
            <MenubarSub>
              <MenubarSubTrigger>Customize</MenubarSubTrigger>
              <MenubarSubContent>
                {["Profile", "Dashboard", "Setting"].map((item) => (
                  <MenubarItem
                    key={item}
                    onSelect={() => router.push(`/${item.toLowerCase()}`)}
                  >
                    {item}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator />
            <MenubarItem>
              Export <MenubarShortcut>⌘⇧E</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Edit Menu */}
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              View In Order <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              View Archive <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Find...</MenubarItem>

            <MenubarSeparator />

            {/* Tags Submenu */}
            <MenubarSub>
              <MenubarSubTrigger>Tag</MenubarSubTrigger>
              <MenubarSubContent>
                {[
                  "Fav Diary days",
                  "Starred Diary days",
                  "Memorable Diary days",
                  "Personal Sticky Note",
                  "Code Note",
                  "Home Note",
                  "Think Note",
                ].map((tag) => (
                  <MenubarItem key={tag}>{tag}</MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        {/* View Menu */}
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={selected} onValueChange={handleViewChange}>
              <MenubarRadioItem value="mydiary">My Diary</MenubarRadioItem>
              <MenubarRadioItem value="stickynote">Sticky Note</MenubarRadioItem>
              <MenubarRadioItem value="mindmap">Mind Map</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        {/* About Us */}
        <MenubarMenu>
          <MenubarTrigger>About Us</MenubarTrigger>
          <MenubarContent>
            {externalLinks.map(({ href, label }) => (
              <MenubarItem key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  {label} <SquareArrowOutUpRight className="size-3 text-black" />
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
