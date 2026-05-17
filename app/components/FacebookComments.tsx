"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

type Props = {
  url: string;
};

export default function FacebookComments({
  url,
}: Props) {

  useEffect(() => {

    const loadFacebook = () => {

      if (window.FB) {

        window.FB.XFBML.parse();

        return;
      }

      const script =
        document.createElement("script");

      script.src =
        "https://connect.facebook.net/sk_SK/sdk.js#xfbml=1&version=v19.0&appId=1350044847019137";

      script.async = true;

      script.defer = true;

      script.crossOrigin = "anonymous";

      script.onload = () => {

        if (window.FB) {
          window.FB.XFBML.parse();
        }

      };

      document.body.appendChild(script);

    };

    loadFacebook();

  }, []);

  return (

    <div className="mt-10">

      <div
        className="fb-comments"
        data-href={url}
        data-width="100%"
        data-numposts="10"
      />

    </div>

  );
}