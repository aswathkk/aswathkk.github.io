import { getAllPosts, getPostData } from "../utils";
import { cache } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.meta.slug }));
}

const getCachedPostData = cache(getPostData);

export function generateMetadata(props: PageProps) {
  const { meta: attributes } = getCachedPostData(props.params.slug);

  return {
    title: attributes.title,
    description: attributes.description,
  };
}

export default function Post(props: PageProps) {
  const { meta, htmlData } = getCachedPostData(props.params.slug);

  return (
    <div>
      <h1 className="text-4xl">{meta.title}</h1>
      <div>
        date: {meta.date.toLocaleDateString()} | Tags: {meta.tags.join(", ")}
      </div>
      <div
        className="prose prose-a:text-sky-500"
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
    </div>
  );
}
