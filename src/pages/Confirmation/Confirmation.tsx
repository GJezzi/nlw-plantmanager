import React from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/Button";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

// import { Container } from './styles';

export function Confirmation() {
  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate("PlantsSelection");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.emoji}>😄</Text>
          <View style={styles.header}>
            <Text style={styles.title}>Prontinho</Text>
            <Text style={styles.subtitle}>
              Agora vamos começar a cuidar das suas{"\n"}plantinhas com muito
              cuidado.
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Button title="Começar" onPress={handleSubmit} />
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
