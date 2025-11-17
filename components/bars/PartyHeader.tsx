import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useNavigation } from "@react-navigation/native";

interface PartyHeaderProps {
    eventName: string;
    facilityName: string;
    startDate: string;
    endDate: string;
    countPartyNum?: number;
}

export default function PartyHeader({ eventName, facilityName, startDate, endDate, countPartyNum = 8 }: PartyHeaderProps) {
    const navigation = useNavigation();
    return (
        <View className="mt-6">
            <View className="flex-row items-center px-5 mb-5">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color={colors.black} />
                </TouchableOpacity>

                <Text
                    className="text-[22px] font-[Paperlogy-Medium] ml-4"
                    style={{ color: colors.black }}
                    numberOfLines={1}
                >
                    파티 목록 ({countPartyNum})
                </Text>
            </View>
            <View
                className="mx-5 px-5 py-6"
                style={{ 
                    backgroundColor: colors.bgOrange, 
                    borderTopWidth: 2,
                    borderBottomWidth: 2,
                    borderColor: colors.orange
                }}>
                <Text
                    className="mb-2"
                    style={[fonts.largeText, { color: colors.orange }]}
                    numberOfLines={2}
                >
                    {eventName}
                </Text>

                <Text
                    className="mb-2"
                    style={[fonts.mediumText, { color: colors.black }]}
                    numberOfLines={1}
                >
                    {facilityName}
                </Text>

                <Text
                    style={[fonts.smallText, { color: colors.darkGray }]}
                >
                    {`${startDate} ~ ${endDate}`}
                </Text>
            </View>
        </View>
    );

}