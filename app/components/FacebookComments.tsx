"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

type Props = {
  url: string;
};

export default function FacebookComments({
  url,
}: Props) {

  console.log(
    "FB APP ID:",
    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
  );

  const commentsRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const renderComments = () => {

      if (
        !window.FB ||
        !commentsRef.current
      ) {
        return;
      }

      commentsRef.current.innerHTML = `
        <div
          class="fb-comments"
          data-href="${url}"
          data-width="100%"
          data-numposts="5">
        </div>
      `;

      window.FB.XFBML.parse(
        commentsRef.current
      );
    };

    if (window.FB) {

      renderComments();

      return;
    }

    window.fbAsyncInit =
      function () {

        window.FB.init({
          appId:
            process.env
              .NEXT_PUBLIC_FACEBOOK_APP_ID,

          cookie: true,

          xfbml: true,

          version: "v19.0",
        });

        renderComments();
      };

    const existingScript =
      document.getElementById(
        "facebook-jssdk"
      );

    if (!existingScript) {

      const script =
        document.createElement("script");

      script.id = "facebook-jssdk";

      script.src =
        "https://connect.facebook.net/en_US/sdk.js";

      script.async = true;

      script.defer = true;

      document.body.appendChild(script);
    }

  }, [url]);

  return (
    <div ref={commentsRef} />
  );
}