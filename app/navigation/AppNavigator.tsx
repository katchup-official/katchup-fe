import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import type { RootTabParamList } from "./_types";

import CreatePartyStack from "./CreatePartyStack";
import PartyListScreen from "../party-list";
import MainStack from "./MainStack";
import LikedPartyListScreen from "../liked-party";
import MyScreen from "../my";
import AppHeader from "@/components/bars/AppHeader";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <>
    <AppHeader />
    <Tab.Navigator
      initialRouteName="MainStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray,
          height: 80,
          paddingVertical: 0,
        },
        tabBarItemStyle: {
          paddingTop: 6,
        },  
        tabBarIcon: ({ color }) => {
          const size = 29;
          switch (route.name) {
            case "CreatePartyStack":
              return <Feather name="edit" size={size} color={color} />;
            case "PartyListScreen":
              return <Ionicons name="list-outline" size={size} color={color} />;
            case "MainStack":
              return <Ionicons name="home" size={size} color={color} />;
            case "LikedPartyListScreen":
              return <Ionicons name="heart" size={size} color={color} />;
            case "MyScreen":
              return <Ionicons name="person-outline" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="CreatePartyStack" component={CreatePartyStack} />
      <Tab.Screen name="PartyListScreen" component={PartyListScreen} />
      <Tab.Screen name="MainStack" component={MainStack} />
      <Tab.Screen name="LikedPartyListScreen" component={LikedPartyListScreen} />
      <Tab.Screen name="MyScreen" component={MyScreen} />
    </Tab.Navigator>
    </>
  );
}