declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "ract-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
