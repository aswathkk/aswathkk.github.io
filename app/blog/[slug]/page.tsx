import { getPostData } from "../utils";
import { cache } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const getCachedPostData = cache(getPostData);

export function generateMetadata(props: PageProps) {
  const { attributes } = getCachedPostData(props.params.slug);

  return {
    title: attributes.title,
    description: attributes.description,
  };
}

export default function Post(props: PageProps) {
  const { attributes, htmlData } = getCachedPostData(props.params.slug);

  return (
    <div>
      <h1 className="text-4xl">{attributes.title}</h1>
      <div>
        date: {attributes.date.toLocaleDateString()} | Tags:{" "}
        {attributes.tags.join(", ")}
      </div>
      <div
        className="prose prose-a:text-sky-500"
        dangerouslySetInnerHTML={{ __html: htmlData }}
      ></div>
    </div>
  );
}
