import ReactMarkdown from "react-markdown";
import Image from "next/image";

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

function paragraphComponent(props: any) {
  const { children } = props;
  if (children?.props?.node?.tagName === "img") {
    return children;
  }
  return <p>{children}</p>;
}

export default function Markdown(props: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        img: ImageComponent,
        p: paragraphComponent,
      }}
    >
      {props.markdown}
    </ReactMarkdown>
  );
}
