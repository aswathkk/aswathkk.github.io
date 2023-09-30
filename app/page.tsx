import Link from "next/link";

export default function Home() {
  return (
    // <div className="sm:container mx-auto">{children}</div>
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl">Aswath K</h1>
      <Link href="/blog">
        <span className="text-sky-500 text-center">/blog</span>
      </Link>
    </div>
  );
}
