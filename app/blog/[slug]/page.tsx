import Markdown from "../../components/Markdown";
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
  const { meta, markdown } = getCachedPostData(props.params.slug);

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-5 text-gray-700">
        {meta.title}
      </h1>
      <div className="mb-5 text-sm text-gray-400 flex">
        {meta.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}{" "}
      </div>
      <div className="prose prose-a:text-indigo-600">
        <Markdown markdown={markdown} />
      </div>
    </div>
  );
}
