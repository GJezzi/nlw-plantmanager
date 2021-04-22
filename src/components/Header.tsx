import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../styles/colors";

import profile from "../assets/profile.jpeg";
import fonts from "../styles/fonts";

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Gian</Text>
      </View>
      <Image source={profile} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 32,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  userName: {
    lineHeight: 36,
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
