import React from "react";
import { Text, Image, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";

type ButtonIconProps = RectButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonIconProps) {
  return (
    <RectButton {...rest} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
