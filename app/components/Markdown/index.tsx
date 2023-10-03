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
    if (children?.props?.node?.children?.[0]?.value === "@preview") {
      return children;
    }
  }
  return <p>{children}</p>;
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

function LinkComponent({ children, href }: any) {
  if (children === "@preview") {
    return <LinkPreviewWithMetaData href={href} />;
  }
  return (
    <Link href={href} className="italic">
      {children}
    </Link>
  );
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
