import { View } from "react-native";
import AppHeader from "@/components/bars/AppHeader";
import AppNavigator from "./navigation/AppNavigator";

export default function MainScreen(){
    return (
        <View className="flex-1 bg-white">
            <AppHeader />
        </View>
    );
}
