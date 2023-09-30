import fs from "fs";
import Link from "next/link";
import { resolve } from "path";

function getPosts() {
  const cwd = resolve(process.cwd(), "app/blog/source");
  const files = fs.readdirSync(cwd);
  return files;
}

export default async function Blog() {
  const files = getPosts();

  return (
    <>
      <p>
        Welcome to my blog.
        <br />
        Here's a list of all posts available in this blog. Some of them might be
        already published in other platforms
      </p>
      <ul>
        {files.map((x: any) => (
          <li key={x}>
            <Link className="text-sky-500" href={`blog/${x}`}>
              {x}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
