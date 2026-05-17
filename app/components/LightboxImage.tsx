"use client";

import { useState } from "react";

import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

type Props = {
  src: string;
  alt?: string;
};

export default function LightboxImage({
  src,
  alt,
}: Props) {

  const [open, setOpen] = useState(false);

  return (
    <>

      <Image
        src={src}
        alt={alt || ""}
        width={1200}
        height={700}
        className="rounded-2xl my-10 cursor-pointer"
        onClick={() => setOpen(true)}
      />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
      />

    </>
  );
}