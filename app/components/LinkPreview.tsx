import Image from "next/image";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface LinkPreviewProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
}

async function FavIconWithFallback({
  favicon,
}: Pick<LinkPreviewProps, "favicon">) {
  let Favicon = <GlobeAltIcon width={16} height={16} />;
  if (favicon) {
    const response = await fetch(favicon);
    if (response.ok) {
      Favicon = <Image width={16} height={16} src={favicon} alt="favicon" />;
    }
  }
  return Favicon;
}

export default function LinkPreview({
  url,
  title,
  description,
  image,
  favicon,
}: LinkPreviewProps) {
  const domain = new URL(url).hostname.replace("www.", "");

  return (
    <Link
      href={url}
      target="_blank"
      className="my-5 flex shadow-sm not-prose bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200 ease-in-out"
      title={title}
    >
      {image && (
        <div className="relative" style={{ minWidth: "128px" }}>
          <Image
            className="rounded-l-lg object-cover object-center"
            fill
            src={image}
            alt={title}
            sizes="128px"
          />
        </div>
      )}
      <div className="p-4">
        <div className="text-base mb-2 line-clamp-1">{title}</div>
        <div className="text-xs mb-2 line-clamp-3">{description}</div>
        <div className="flex">
          <FavIconWithFallback favicon={favicon} />
          <p className="ml-1 text-xs text-gray-400 line-clamp-1">{domain}</p>
        </div>
      </div>
    </Link>
  );
}
