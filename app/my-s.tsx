import { View } from "react-native";
import AppHeader from "@/components/bars/AppHeader";

export default function MyScreen(){
    return (
        <View className="flex-1 bg-white">
            <AppHeader />
        </View>
    );
}