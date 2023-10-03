import { JSDOM } from "jsdom";

function getTitle(document: Document) {
  const ogTitle = document
    .querySelector('meta[property="og:title"]')
    ?.getAttribute("content");
  if (ogTitle) {
    return ogTitle;
  }
  const twitterTitle = document
    .querySelector('meta[name="twitter:title"]')
    ?.getAttribute("content");
  if (twitterTitle) {
    return ogTitle;
  }
  return document.title;
}

function getDescription(document: Document) {
  const ogDescription = document
    .querySelector('meta[property="og:description"]')
    ?.getAttribute("content");
  if (ogDescription) {
    return ogDescription;
  }
  const twitterDescription = document
    .querySelector('meta[name="twitter:description"]')
    ?.getAttribute("content");
  if (twitterDescription) {
    return twitterDescription;
  }
  return document
    .querySelector("meta[name='description']")
    ?.getAttribute("content");
}

function getDomainName(document: Document) {
  const canonicalLink = document.querySelector(
    "link[rel='canonical']"
  ) as HTMLLinkElement;
  if (canonicalLink && canonicalLink.href) {
    return canonicalLink.href;
  }
  return document
    .querySelector("meta[property='og:url']")
    ?.getAttribute("content");
}

function getFavicon(document: Document) {
  return document.querySelector("link[rel='icon']")?.getAttribute("href");
}

function getImage(document: Document) {
  return document
    .querySelector("meta[property='og:image']")
    ?.getAttribute("content");
}

export async function getWebsiteMetadata(url: string) {
  const response = await fetch(url);
  const data = await response.text();

  const dom = new JSDOM(data);
  const document = dom.window.document;
  return {
    title: getTitle(document) ?? undefined,
    description: getDescription(document) ?? undefined,
    domainName: getDomainName(document) ?? undefined,
    favicon: getFavicon(document) ?? undefined,
    image: getImage(document) ?? undefined,
  };
}
