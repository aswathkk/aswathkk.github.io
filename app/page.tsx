import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl text-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        Aswath K
      </h1>
      <span className="text-center text-sm mt-4 italic text-gray-500">
        This is still under construction, but don&apos;t worry, I&apos;m not
        building a skyscraper!
        <br /> In the mean time, you can checkout{" "}
        <Link href="/blog">
          <span className="hover:underline text-indigo-600">my blog</span>!
        </Link>
      </span>
    </div>
  );
}
