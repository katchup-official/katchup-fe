import React from "react";
import { Text } from "react-native";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

interface EventListHeaderProps {
    title: string;
}

export default function EventListTitle({title}: EventListHeaderProps) {
    return (
        <Text 
            className="mb-8"
            style={[fonts.mediumText, { color: colors.black }]}
        >
            {title}
        </Text>
    );

}

