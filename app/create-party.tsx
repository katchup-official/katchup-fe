import { View } from "react-native";
import AppHeader from "@/components/bars/AppHeader";
import AppNavigator from "./navigation/AppNavigator";

export default function CreatePartyScreen(){
    return (
        <View className="flex-1 bg-white">
            <AppHeader />
            <AppNavigator />
        </View>
    );
}