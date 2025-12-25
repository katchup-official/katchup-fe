import React from "react";
import { ScrollView } from "react-native";
import MyProfileSection from "@/components/sections/MyProfileSection";
import MyStyleSection from "@/components/sections/MyStyleSection";

export default function MyScreen(){

    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
            <MyProfileSection />
            <MyStyleSection />
        </ScrollView>
    );
}