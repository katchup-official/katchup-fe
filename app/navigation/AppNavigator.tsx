import React, { useState, useEffect, use } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { navigate } from "./NavigationRef";
import { RootStackParamList } from "./types";

export default function AppNavigator() {
    const [activeTab, setActiveTab] = useState<keyof RootStackParamList>("MainScreen");

    const handlePress = (tabName: keyof RootStackParamList) => {
        if (activeTab === tabName) return; // 이미 현재 탭이면 무시
        setActiveTab(tabName);
        navigate(tabName);
    };

    const getIconColor = (tabName: keyof RootStackParamList) => {
        return activeTab === tabName ? colors.orange : colors.gray;
    };

    return (
        <SafeAreaView
            className="absolute bottom-0 left-0 right-0 border-t"
            style={{
                backgroundColor: colors.white,
                borderColor: colors.gray,
            }}
        >
            <View
                className="flex-row justify-around items-center py-3"
            >
                <TouchableOpacity onPress={() => handlePress("CreatePartyScreen")}>
                    <Feather name="edit" size={30} color={getIconColor("CreatePartyScreen")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("PartyListScreen")}>
                    <Ionicons name="list-outline" size={30} color={getIconColor("PartyListScreen")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("MainScreen")}>
                    <Ionicons name="home" size={30} color={getIconColor("MainScreen")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("EventListScreen")}>
                    <Ionicons name="location-outline" size={30} color={getIconColor("EventListScreen")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress("MyScreen")}>
                    <Ionicons name="person-outline" size={30} color={getIconColor("MyScreen")} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}