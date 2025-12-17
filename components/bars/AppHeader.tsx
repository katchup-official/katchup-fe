import React from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const LOGO3 = require("../../assets/images/katchup-logo3.png"); 

export default function AppHeader() {
    const router = useRouter();
    return (
        <SafeAreaView
            style={{ backgroundColor: colors.white }}
        >
            <View
                className="flex-row items-center justify-between px-5 py-3 border-b"
                style={{ 
                    borderColor: colors.gray
                }}
            >
                <Image source={LOGO3} className="w-[120px] h-[40px]" resizeMode="contain" />

                <View className="flex-row items-center">
                    <TouchableOpacity 
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="notifications-outline" size={28} color={colors.orange} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="ml-4"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        onPress={() => router.push("/settings")}
                    >
                        <Feather name="menu" size={28} color={colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}