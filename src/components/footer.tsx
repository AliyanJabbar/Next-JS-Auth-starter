import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-xs text-muted-foreground opacity-40 hover:opacity-70 transition-opacity">
      <Link
        href="https://aliyan-jabbar-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        © {new Date().getFullYear()}{" "}
        <span className="font-medium">Aliyan Jabbar</span> — Next.js 16 Auth
        Starter{" "}
      </Link>
    </footer>
  );
};

export default Footer;
