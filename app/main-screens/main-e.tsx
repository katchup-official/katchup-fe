import React, { useState } from "react";
import { View,ScrollView } from "react-native";
import EventSearchBar from "@/components/bars/EventSearchBar";
import EventList from "@/components/lists/EventList";

export default function MainEventScreen(){
    const [searchEvent, setSearchEvent] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [countEventNum, setCountEventNum] = useState<number | null>(null);

    const handleSearchConfirm = (query: string) => {
        setSearchEvent(query);
        setIsSearched(true);
        setCountEventNum(10);
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
                <EventSearchBar 
                    onSearch={handleSearchConfirm}
                    placeholderText="가고 싶은 행사를 입력해주세요." />
                <EventList 
                    searchEvent={searchEvent}
                    countEventNum={countEventNum}
                    isSearched={isSearched}
                    isAllEventMode={false}
                />
        </ScrollView>
        </View>
    );
}
