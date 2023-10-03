import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import fm from "front-matter";

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
  markdown: string;
}

const SOURCE_PATH = join(cwd(), "data/blog");

function removeMdExtension(slug: string) {
  return slug.replace(/\.md$/, "");
}

/**
 * Retrieves the post data for a given slug.
 * @param slug - The slug of the post to retrieve.
 * @returns The post data, including metadata and markdown content.
 */
export function getPostData(slug: string): PostData {
  const filePath = join(SOURCE_PATH, `${slug}.md`);
  const fileContent = readFileSync(filePath, "utf-8");
  // Extracts out the attributes from YAML front matter
  const { attributes, body } = fm<PostData["meta"]>(fileContent);

  return {
    meta: { ...attributes, slug },
    markdown: body,
  };
}

/**
 * Returns an array of all the blog post data, sorted in descending order of date.
 * @returns An array of PostData objects.
 */
export function getAllPosts(): PostData[] {
  const files = readdirSync(SOURCE_PATH, { withFileTypes: true });
  const posts = files
    .filter((dirent) => dirent.isFile())
    .map((dirent) => getPostData(removeMdExtension(dirent.name)))
    // sort the posts in descending order of date
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  return posts;
}
