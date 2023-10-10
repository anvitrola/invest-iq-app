import React from "react";
import { AnimatedSection } from "./CustomSection.styles";

export default function CustomSection({ gridArea, children }) {
  return <AnimatedSection gridArea={gridArea}>{children}</AnimatedSection>;
}
