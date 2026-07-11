"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,

  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({
  title,
  url,
}: Props) {
  return (

    <div className="mt-8">

      <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Zdieľať článok
      </div>

      <div className="flex flex-wrap gap-3">

        <FacebookShareButton url={url}>
          <FacebookIcon size={42} round />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={42} round />
        </TwitterShareButton>

        <LinkedinShareButton url={url}>
          <LinkedinIcon size={42} round />
        </LinkedinShareButton>

        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={42} round />
        </WhatsappShareButton>

        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={42} round />
        </TelegramShareButton>

        <EmailShareButton url={url} subject={title}>
          <EmailIcon size={42} round />
        </EmailShareButton>

      </div>

    </div>

  );
}