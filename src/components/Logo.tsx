import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React from "react";
import Image from "./Image"

interface LogoProps {
  logo: string;
  alt: string;
  link: string;
  className?: string;
}

const Logo = ({ logo, alt, link, className = "" }: LogoProps) => (
  <Grid className={`logoWrap ${className}`}>
    <NavLink to={link}>
      <Image src={logo} alt={alt} />
    </NavLink>
  </Grid>
);
export default Logo;
