import { ReactNode } from "react";
import styles from "./styles.module.css";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <div className={`${styles.container} mx-auto`}>{children}</div>;
}
