import Link from "next/link";
import { getAllPosts } from "./utils";

export default async function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <h2 className="mb-5">Articles</h2>
      <hr className="mb-5" />
      <ul>
        {posts.map((post) => (
          <li key={post.meta.slug} className="mb-3">
            <Link
              className="text-indigo-600 line-clamp-1 hover:underline"
              href={`blog/${post.meta.slug}`}
              title={post.meta.title}
            >
              {post.meta.title}
            </Link>
            <div className="text-xs text-gray-400">
              {post.meta.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
