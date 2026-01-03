import React, { useState } from "react";
import { View } from "react-native";
import EventSearchBar from "@/components/bars/EventSearchBar";
import EventList from "@/components/lists/EventList";
import LoadingOverlay from "@/components/loadings/LoadingOverlay";

export default function ChooseEventScreen(){
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
                placeholderText="생성할 파티의 행사를 검색하세요." />
            <EventList 
                searchEvent={searchEvent}
                isSearched={isSearched}
                isAllEventMode={false}
                isCreatePartyMode={true}
                onLoadingChange={setLoading}
            />
            <LoadingOverlay visible={loading} />
        </View>
    );
}