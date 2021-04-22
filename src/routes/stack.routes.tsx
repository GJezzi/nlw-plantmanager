import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../pages/Welcome/Welcome";
import { UserIdentification } from "../pages/UserIdentification/UserIdentification";
import { Confirmation } from "../pages/Confirmation/Confirmation";
import { PlantsSelection } from "../pages/PlantsSelection/PlantsSelection";

import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    <stackRoutes.Screen name="PlantsSelection" component={PlantsSelection} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
