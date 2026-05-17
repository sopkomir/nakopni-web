"use client";
console.log(
  "FB APP ID:",
  process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
);

import { useEffect } from "react";

type Props = {
  url: string;
};

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function FacebookComments({ url }: Props) {

  useEffect(() => {

    window.fbAsyncInit = function () {

      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      window.FB.XFBML.parse();
    };

    const existingScript =
      document.getElementById("facebook-jssdk");

    if (!existingScript) {

      const script = document.createElement("script");

      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";

      script.src =
        "https://connect.facebook.net/en_US/sdk.js";

      document.body.appendChild(script);

    } else {

      if (window.FB) {
        window.FB.XFBML.parse();
      }

    }

  }, [url]);

  return (
    <div
      className="fb-comments"
      data-href={url}
      data-width="100%"
      data-numposts="5"
    />
  );
}