import React from "react";
import { View, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import Button from "../../components/Button";

// import { Container } from './styles';

export function UserIdentification() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.emoji}>😃</Text>
          <Text style={styles.text}>Como podemos{"\n"}chamar você?</Text>
          <TextInput style={styles.input} placeholder="Digite um nome" />
          <View style={styles.buttonView}>
            <Button title="Confirmar" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    fontSize: 44,
  },
  text: {
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 32,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    borderColor: colors.gray,
    color: colors.heading,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  buttonView: {
    padding: 40,
  },
});
