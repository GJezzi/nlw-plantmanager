import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { EnvironmentButton } from "../../components/EnvironmentButton";
import { Header } from "../../components/Header";
import { PlantCard } from "../../components/PlantCard";
import api from "../../services/api";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantsSelection() {
  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironment([{ key: "all", title: "Todos" }, ...data]);
    }
    fetchEnvironment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get("plants?_sort=title&_order=asc");
      setPlants(data);
    }
    fetchPlants();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pageHeader}>
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitlte}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={environment}
          renderItem={({ item }) => <EnvironmentButton title={item.title} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plantsGrid}>
        <FlatList
          data={plants}
          renderItem={({ item }) => <PlantCard data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
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
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plantsGrid: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
