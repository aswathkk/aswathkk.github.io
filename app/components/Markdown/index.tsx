import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { getWebsiteMetadata } from "./utils";
import LinkPreview from "../LinkPreview";

function ImageComponent(props: any) {
  const { alt, src, title } = props;
  const image = require(`public/${src}`).default;
  const Component = (
    <>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt as string}
      />
      {title && <figcaption className="text-center">{title}</figcaption>}
    </>
  );

  return title ? <figure>{Component}</figure> : Component;
}

function ParagraphComponent(props: any) {
  const { children } = props;
  if (children?.props?.node?.tagName === "img") {
    return children;
  }
  if (children?.props?.node?.tagName === "a") {
    if (
      children?.props?.node?.children?.[0]?.value === "@preview" ||
      children?.props?.node?.children?.[0]?.value === "@tweetPreview"
    ) {
      return children;
    }
  }
  return <p className="">{children}</p>;
}

async function LinkPreviewWithMetaData({ href }: any) {
  const metaData = await getWebsiteMetadata(href);

  if (!metaData.title) {
    return (
      <Link href={href} className="italic">
        {href}
      </Link>
    );
  }

  return (
    <LinkPreview
      url={href}
      title={metaData.title}
      description={metaData.description}
      image={metaData.image}
      favicon={metaData.favicon}
    />
  );
}

async function EmbedTweet({ href }: any) {
  const url = `https://publish.twitter.com/oembed?url=${href}`;
  const response = await fetch(url).then((res) => res.json());
  return (
    <div
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: response.html }}
    />
  );
}

function LinkComponent({ children, href }: any) {
  if (children === "@preview") {
    return <LinkPreviewWithMetaData href={href} />;
  }
  if (children === "@tweetPreview") {
    return <EmbedTweet href={href} />;
  }
  return <Link href={href}>{children}</Link>;
}

export default function Markdown(props: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        img: ImageComponent,
        p: ParagraphComponent,
        a: LinkComponent,
      }}
    >
      {props.markdown}
    </ReactMarkdown>
  );
}
