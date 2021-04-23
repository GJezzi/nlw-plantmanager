import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.button, active && styles.activeButton]}
      {...rest}
    >
      <Text style={[styles.buttonText, active && styles.activeText]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  activeButton: {
    backgroundColor: colors.green_light,
  },
  buttonText: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  activeText: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
