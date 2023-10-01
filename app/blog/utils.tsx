import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import fm from "front-matter";
import { marked } from "marked";

interface PostMeta {
  /**
   * Title of the article.
   */
  title: string;

  /**
   * Description of the article.
   */
  description: string;

  /**
   * Date of publishing the article.
   */
  date: Date;

  /**
   * Relevant tags.
   */
  tags: string[];

  /**
   * Indicates if the post is draft or published.
   */
  draft: boolean;

  /**
   * URL slug for the post (same as file name).
   */
  slug: string;

  /**
   * URL in which the post is originally published.
   */
  originUrl?: string;
}

interface PostData {
  meta: PostMeta;
  htmlData: string;
}

const SOURCE_PATH = join(cwd(), "app/blog/source");

function removeMdExtension(slug: string) {
  return slug.replace(/\.md$/, "");
}

export function getPostData(slug: string, onlyMeta = false): PostData {
  const filePath = join(SOURCE_PATH, `${slug}.md`);
  const fileContent = readFileSync(filePath, "utf-8");
  // Extracts out the attributes from YAML front matter
  const { attributes, body } = fm<PostData["meta"]>(fileContent);
  // Parses markdown format
  const htmlData = onlyMeta ? "" : marked(body);

  return {
    meta: { ...attributes, slug },
    htmlData,
  };
}

export function getAllPosts(): PostData[] {
  const files = readdirSync(SOURCE_PATH);
  const posts = files
    .map((slug) => getPostData(removeMdExtension(slug), false))
    // sort the posts in descending order of date
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  return posts;
}
