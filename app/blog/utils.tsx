import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import fm from "front-matter";
import { marked } from "marked";

type PostData = {
  attributes: {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    draft: boolean;
  };
  htmlData: string;
};

export function getPostData(slug: string): PostData {
  const SOURCE_PATH = join(cwd(), "app/blog/source", slug);
  const fileContent = readFileSync(SOURCE_PATH, "utf-8");
  // Extracts out the attributes from YAML front matter
  const { attributes, body } = fm<PostData["attributes"]>(fileContent);
  // Parses markdown format
  const htmlData = marked(body);

  return {
    attributes: attributes,
    htmlData,
  };
}
