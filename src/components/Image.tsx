import React from "react";

interface ImageProps {
  className?: string | undefined;
  src: string;
  alt?: string | "";
}

const Image = (props: ImageProps) => {
  return <img className={props.className} src={props.src} alt={props.alt} />;
};

export default Image;
