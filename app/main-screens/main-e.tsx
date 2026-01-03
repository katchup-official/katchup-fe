import React, { useState } from "react";
import { View } from "react-native";
import EventSearchBar from "@/components/bars/EventSearchBar";
import EventList from "@/components/lists/EventList";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";

export default function MainEventScreen(){
    const [searchEvent, setSearchEvent] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchConfirm = (query: string) => {
        const keyword = query.trim();

        if (!keyword) {
            setIsSearched(false);
            setSearchEvent("");
            return;
        }
        setSearchEvent(keyword);
        setIsSearched(keyword.length > 0);
    }

    return (
        <View className="flex-1 bg-white">
            <EventSearchBar 
                onSearch={handleSearchConfirm}
                placeholderText="가고 싶은 행사를 입력해주세요." />
            <EventList 
                searchEvent={searchEvent}
                isSearched={isSearched}
                isAllEventMode={false}
                onLoadingChange={setLoading}
            />
            <LoadingOverlay visible={loading} />
        </View>
    );
}
