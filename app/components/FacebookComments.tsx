"use client";

type Props = {
  url: string;
};

export default function FacebookComments({ url }: Props) {

  return (
    <div className="w-full overflow-hidden">

      <iframe
        title="Facebook comments"
        src={`https://www.facebook.com/plugins/comments.php?href=${encodeURIComponent(
          url
        )}&width=100%25&numposts=5`}
        width="100%"
        height="700"
        style={{
          border: "none",
          background: "white",
        }}
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
      />

    </div>
  );
}