import Image from "next/image";
import { PortableText } from "@portabletext/react";

import LightboxImage from "./LightboxImage";
import { urlFor } from "../lib/image";

interface Props {
  value: any;
}

export default function PortableContent({ value }: Props) {
  return (
    <div className="prose prose-lg max-w-none prose-neutral text-black">

      <PortableText
        value={value}
        components={{
          types: {

            image: ({ value }) => (
              <LightboxImage
                src={urlFor(value).width(1200).url()}
                alt=""
              />
            ),

            gallery: ({ value }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                {value.images?.map((image: any, index: number) => (
                  <Image
                    key={index}
                    src={urlFor(image).width(800).url()}
                    alt=""
                    width={800}
                    height={600}
                    className="rounded-2xl object-cover"
                  />
                ))}
              </div>
            ),

            youtube: ({ value }) => {
              const videoId = value.url.split("v=")[1];

              return (
                <div className="my-10">
                  <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    allowFullScreen
                    className="rounded-2xl"
                  />
                </div>
              );
            },

          },
        }}
      />

    </div>
  );
}