import React from "react";
import { Text, View, ImageBackground, FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";

import Header from "../../components/Header";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";
import Member from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";

export function AppointmentDetails() {
  const members = [
    {
      id: "1",
      username: "Guilherme",
      avatar_url: "https://github.com/guilherme-luccas.png",
      status: "online",
    },
    {
      id: "2",
      username: "Fellipe",
      avatar_url: "https://github.com/fsabreu.png",
      status: "online",
    },
  ];

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>Jogatinas de League of Legends</Text>
        </View>
      </ImageBackground>
      <ListHeader title="Jogadores" subtitle="Total 3" />
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na Partida" />
      </View>
    </Background>
  );
}
