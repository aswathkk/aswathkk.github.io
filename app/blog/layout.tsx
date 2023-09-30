import styles from "./styles.module.css";

export default function BlogLayout({ children }) {
  return <div className={`${styles.container} mx-auto`}>{children}</div>;
}
