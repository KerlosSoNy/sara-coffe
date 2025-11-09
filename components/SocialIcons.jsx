import React from "react";
import Image from "next/image";
import Link from "next/link";
import FacebookIcon from "../public/assets/icons/facebook.svg";
import InstagramIcon from "../public/assets/icons/instagram.svg";
import LinkedinIcon from "../public/assets/icons/linkedin.svg";
import YoutubeIcon from "../public/assets/icons/youtube.svg";

export default function SocialIcons({ className, width, height }) {
  return (
    <div className={className}>
      {/* <Link href="/facebook">
        <Image
          src={FacebookIcon}
          width={width}
          height={height}
          alt="facebook"
        />
      </Link> */}
      <Link href="https://www.instagram.com/cama_gears/">
        <Image
          src={InstagramIcon}
          width={width}
          height={height}
          alt="instagram"
        />
      </Link>
      {/* <Link href="/linkedin">
        <Image
          src={LinkedinIcon}
          width={width}
          height={height}
          alt="linkedin"
        />
      </Link> */}
      <Link href="https://www.youtube.com/@camacoffeegears">
        <Image src={YoutubeIcon} width={width} height={height} alt="youtube" />
      </Link>
    </div>
  );
}
