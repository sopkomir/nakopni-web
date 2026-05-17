"use client";

import { DiscussionEmbed } from "disqus-react";

type Props = {
  slug: string;
  title: string;
};

export default function DisqusComments({
  slug,
  title,
}: Props) {

  const disqusConfig = {
    url: `http://localhost:3000/${slug}`,
    identifier: slug,
    title,
    language: "sk",
  };

  return (
    <DiscussionEmbed
      shortname="nakopni-sk"
      config={disqusConfig}
    />
  );
}