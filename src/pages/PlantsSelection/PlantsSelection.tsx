import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Header } from "../../components/Header";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export function PlantsSelection() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pageHeader}>
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitlte}>você quer colocar sua planta?</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  pageHeader: {
    paddingHorizontal: 33,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  subtitlte: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 23,
  },
});
