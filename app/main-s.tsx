import { View,ScrollView } from "react-native";
import AppHeader from "@/components/bars/AppHeader";
import EventSearchBar from "@/components/bars/EventSearchBar";
import EventList from "@/components/lists/EventList";

export default function MainScreen(){
    return (
        <View className="flex-1 bg-white">
            <AppHeader />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}>
            <EventSearchBar />
            <EventList />
        </ScrollView>
        </View>
    );
}
