import "./tokens.scss";

import Link from "next/link";
import { useState } from "react";
import { DotsIcon, XIcon } from "./Icons";

const navLinks = [
	{ href: "/work", label: "Work" },
	{ href: "/approach", label: "Approach" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

export default function MobileNav() {
	const [open, setOpen] = useState(false);
		return (
			<div className="md:hidden relative">
				<button
					aria-label={open ? "Close menu" : "Open menu"}
					onClick={() => setOpen((v) => !v)}
					className="p-2 rounded text-2xl text-gray-700 focus:outline-none z-50 bg-transparent border-none"
					style={{ position: "relative" }}
				>
					{open ? <XIcon /> : <DotsIcon />}
				</button>
				{open && (
					<nav className="mobile-nav-dropdown flex flex-col fixed top-16 left-0 w-[calc(100%-2rem)] mx-2 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="px-4 py-3 text-base font-medium rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition mb-1"
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</nav>
				)}
			</div>
		);
}
