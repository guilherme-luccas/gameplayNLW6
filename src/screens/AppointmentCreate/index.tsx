import React, { useState } from "react";
import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { Background } from "../../components/Background";
import { CategorySelect } from "../../components/CategorySelect";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import uuid from "react-native-uuid";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

export function AppointmentCreate() {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }
  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }
  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }
  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Header title="Agendar partida" />

        <Text
          style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 },
          ]}
        >
          Categoria
        </Text>
        <CategorySelect
          hasCheckbox
          setCategory={handleCategorySelect}
          categorySelected={category}
        />
        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {guild.icon ? (
                <GuildIcon guildId={guild.id} iconId={guild.icon} />
              ) : (
                <View style={styles.image} />
              )}

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name ? guild.name : "Selecione um servidor"}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>Dia e mês</Text>
              <View style={styles.column}>
                <SmallInput onChangeText={setDay} maxLength={2} />
                <Text style={styles.divider}>/</Text>
                <SmallInput onChangeText={setMonth} maxLength={2} />
              </View>
            </View>
            <View>
              <Text style={styles.label}>Hora e minuto</Text>
              <View style={styles.column}>
                <SmallInput onChangeText={setHour} maxLength={2} />
                <Text style={styles.divider}>:</Text>
                <SmallInput onChangeText={setMinute} maxLength={2} />
              </View>
            </View>
          </View>
          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea
            multiline
            maxLength={100}
            numberOfLines={5}
            autoCorrect={false}
            onChangeText={setDescription}
          />
          <View style={styles.footer}>
            <Button title="Agendar" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
