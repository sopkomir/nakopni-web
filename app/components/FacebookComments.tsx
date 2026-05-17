"use client";

type Props = {
  url: string;
};

export default function FacebookComments({ url }: Props) {

  const encodedUrl = encodeURIComponent(url);

  return (
    <iframe
      src={`https://www.facebook.com/plugins/comments.php?href=${encodedUrl}&numposts=5&width=100%`}
      width="100%"
      height="600"
      style={{
        border: "none",
        overflow: "hidden",
      }}
      scrolling="no"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}