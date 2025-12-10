import React from "react";
import { View,ScrollView } from "react-native";
import EventList from "@/components/lists/EventList";

export default function EventListScreen(){

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
                <EventList 
                    searchEvent={null}
                    countEventNum={null}
                    isSearched={false}
                    isAllEventMode={true}
                />
        </ScrollView>
        </View>
    );
}