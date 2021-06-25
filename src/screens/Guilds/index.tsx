import React from "react";
import { View, Text, FlatList } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export default function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    {
      id: "1",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "2",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "3",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "4",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "5",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "6",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
    {
      id: "7",
      name: "Lendarios",
      icon: "image.png",
      owner: true,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 69 }}
        ItemSeparatorComponent={() => <ListDivider />}
        ListHeaderComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  );
}
