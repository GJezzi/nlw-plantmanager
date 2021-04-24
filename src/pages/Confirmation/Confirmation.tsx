import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/Button";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  smile: "😄",
  hug: "🤗",
};

export function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = route.params as Params;

  function handleSubmit() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.emoji}>{emojis[icon]}</Text>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button title={buttonTitle} onPress={() => handleSubmit()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center",
  },
  emoji: {
    fontSize: 96,
  },
  header: {
    alignItems: "center",
    marginTop: 64,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 16,
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
  },
  buttonView: {
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
});
