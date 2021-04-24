import React, { useState } from "react";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/core";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore, format } from "date-fns";

import { loadPlant, PlantProps, savePlant } from "../../libs/storage";

import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";

import waterDrop from "../../assets//waterdrop.png";
import Button from "../../components/Button";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface Params {
  plant: PlantProps;
}

export function PlantDetails() {
  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker((oldState) => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! 😉 ");
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo Certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
        buttonTitle: "Muito Obrigado 😃",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch (error) {
      Alert.alert("Não foi possível salvar a planta. 😔");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={156} width={176} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <Text style={styles.reminder}>
          Escolha o melhor horário para ser lembrado:
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>{`Mudar ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonView}>
          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 24,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    paddingTop: 16,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 65,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 24,
    fontSize: 15,
    fontFamily: fonts.text,
    color: colors.blue,
    textAlign: "justify",
  },
  reminder: {
    textAlign: "center",
    fontFamily: fonts.complement,
    fontSize: 13,
    color: colors.heading,
    marginBottom: 16,
  },
  buttonView: {
    alignItems: "center",
  },
  dateTimePickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
