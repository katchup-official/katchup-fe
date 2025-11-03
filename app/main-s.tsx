import { View } from "react-native";
import AppHeader from "@/components/bars/AppHeader";
import AppNavigator from "./navigation/AppNavigator";
import EventSearchBar from "@/components/bars/EventSearchBar";

export default function MainScreen(){
    return (
        <View className="flex-1 bg-white">
            <AppHeader />
            <EventSearchBar />
        </View>
    );
}
