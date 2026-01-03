import React from "react";
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";

interface EventSearchBarProps {
    onSearch?: (query: string) => void;
    placeholderText?: string; 
}

export default function EventSearchBar({ onSearch, placeholderText } : EventSearchBarProps) {
    const [query, setQuery] = React.useState("");

    const handleSearch = () => {
        const keyword = query.trim();
        onSearch?.(keyword);
        Keyboard.dismiss();
    };

    return (
        <View
            className="flex-row items-center rounded-xl px-4 h-[60px] mx-5 mt-10 bg-white border"
            style={{ borderColor: colors.gray }}
        >
            <TextInput
                className="flex-1 text-base"
                style={[
                    fonts.mediumText,
                    {color: colors.black}
                ]}
                placeholder={placeholderText}
                placeholderTextColor={colors.gray}
                returnKeyType="search"
                blurOnSubmit={false}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Feather name="search" size={22} color={colors.darkGray} />
            </TouchableOpacity>
        </View>

    )

}