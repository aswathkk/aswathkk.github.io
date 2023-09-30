import { readFileSync } from "fs";
import { join, resolve } from "path";
import { marked } from "marked";
import { Metadata } from "next";

function getPost(slug: string) {
  const cwd = resolve(process.cwd(), "app/blog/source");
  return readFileSync(join(cwd, decodeURI(slug)), "utf-8");
}

export const metadata: Metadata = {
  title: "Post Name",
};

export default function Post(props) {
  console.log("props", props);
  const fileContent = getPost(props.params.slug);
  const parsedMD = marked.parse(fileContent);
  return (
    <div>
      Blog item
      <div
        className="prose prose-a:text-sky-500"
        dangerouslySetInnerHTML={{ __html: parsedMD }}
      ></div>
    </div>
  );
}
