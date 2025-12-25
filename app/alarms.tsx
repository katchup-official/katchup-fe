import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AlarmHeader from "@/components/bars/AlarmHeader";
import AlarmList from "@/components/lists/AlarmList";
import { alarms } from "@/mocks/alarms";

export default function AlarmsScreen() {
    return (
        <View className="flex-1 bg-white">
            <AlarmHeader />
            <AlarmList data={alarms} />
        </View>
    );

}