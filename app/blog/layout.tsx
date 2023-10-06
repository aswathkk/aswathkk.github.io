import { ReactNode } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className={`${styles.container} mx-auto`}>
      <header className="py-7">
        <Link href={"/blog"} className="text-lg font-bold text-gray-700">
          Aswath&apos;s Blog
        </Link>
      </header>
      {children}
      <hr className="mt-8" />
      <footer className="p-8">
        <div className="text-center">
          Built with muscles 💪🤓 by{" "}
          <Link className="text-indigo-600 hover:underline" href="/">
            Aswath
          </Link>
        </div>
        <div className=""></div>
      </footer>
    </div>
  );
}
