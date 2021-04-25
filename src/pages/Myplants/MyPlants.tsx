import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Alert } from "react-native";

import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import { loadPlant, PlantProps, removePlant } from "../../libs/storage";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import waterDrop from "../../assets/waterdrop.png";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWater, setNextWater] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 👍",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover a planta! 😔");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWater(`Regue a sua ${plantsStoraged[0].name} daqui à ${nextTime}`);

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLightView}>
        <View style={styles.spotLight}>
          <Image source={waterDrop} style={styles.spotLightImage} />
          <Text style={styles.spotLightText}>{nextWater}</Text>
        </View>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  spotLightView: {
    paddingHorizontal: 32,
  },
  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 88,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  spotLightImage: {
    width: 56,
    height: 56,
  },
  spotLightText: {
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 15,
    color: colors.blue,
    textAlign: "justify",
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 32,
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
