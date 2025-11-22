import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Link
        href="https://aliyan-jabbar-portfolio.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full py-4 text-center text-xs text-muted-foreground opacity-40 hover:opacity-70 transition-opacity">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">Aliyan Jabbar</span> — Next.js 16 Auth
          Starter{" "}
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
