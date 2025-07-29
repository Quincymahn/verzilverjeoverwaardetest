export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337" // Fallback for safety
  }${path}`;
}

export function getStrapiMedia(mediaObject) {
  console.log(
    "getStrapiMedia called with mediaObject:",
    JSON.stringify(mediaObject, null, 2)
  );
  console.log(
    "process.env.NEXT_PUBLIC_STRAPI_API_URL in getStrapiMedia:",
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  );

  // Return null early if no media object
  if (!mediaObject) {
    console.warn("getStrapiMedia: mediaObject is null or undefined");
    return null;
  }

  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!strapiApiUrl) {
    console.error("NEXT_PUBLIC_STRAPI_API_URL is not defined.");
    return null;
  }

  let url = null;

  // Handle different Strapi media object structures
  if (mediaObject.url) {
    // Direct URL on the object (Strapi v4 sometimes)
    url = mediaObject.url;
  } else if (mediaObject.data?.attributes?.url) {
    // Nested structure (Strapi v4 with populate)
    url = mediaObject.data.attributes.url;
  } else if (
    mediaObject.data &&
    Array.isArray(mediaObject.data) &&
    mediaObject.data[0]?.attributes?.url
  ) {
    // Array structure (sometimes happens with populate)
    url = mediaObject.data[0].attributes.url;
  } else if (Array.isArray(mediaObject) && mediaObject[0]?.url) {
    // Direct array with URL
    url = mediaObject[0].url;
  } else if (Array.isArray(mediaObject) && mediaObject[0]?.attributes?.url) {
    // Array with nested attributes
    url = mediaObject[0].attributes.url;
  }

  if (!url) {
    console.warn(
      "getStrapiMedia: Could not find URL in any expected structure. Object was:",
      mediaObject
    );
    return null;
  }

  // Construct the full URL
  const imageUrl = url.startsWith("/") ? `${strapiApiUrl}${url}` : url;
  console.log("getStrapiMedia constructed imageUrl:", imageUrl);
  return imageUrl;
}
