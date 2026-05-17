"use client";

import { useEffect } from "react";

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

  useEffect(() => {

    const initFacebook = () => {

      if (!window.FB) {
        return;
      }

      window.FB.XFBML.parse();
    };

    if (window.FB) {

      initFacebook();

      return;
    }

    window.fbAsyncInit = function () {

      window.FB.init({
        appId:
          process.env
            .NEXT_PUBLIC_FACEBOOK_APP_ID,

        cookie: true,

        xfbml: true,

        version: "v19.0",
      });

      initFacebook();
    };

    if (
      !document.getElementById(
        "facebook-jssdk"
      )
    ) {

      const script =
        document.createElement("script");

      script.id = "facebook-jssdk";

      script.src =
        "https://connect.facebook.net/en_US/sdk.js";

      script.async = true;

      script.defer = true;

      document.body.appendChild(script);
    }

  }, []);

  return (

    <div
      className="fb-comments"
      data-href={url}
      data-width="100%"
      data-numposts="5"
    />

  );
}