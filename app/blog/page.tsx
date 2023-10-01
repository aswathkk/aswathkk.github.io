import Link from "next/link";
import { getAllPosts } from "./utils";

export default async function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <p>
        Welcome to my blog.
        <br />
        Here&apos;s a list of all posts available in this blog. Some of them
        might be already published in other platforms
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.meta.slug}>
            <Link className="text-sky-500" href={`blog/${post.meta.slug}`}>
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
