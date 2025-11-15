import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { MainStackParamList } from "@/app/navigation/MainStack";
import PartyHeader from "@/components/bars/PartyHeader";

export default function MainPartyScreen(){
    const route = useRoute<RouteProp<MainStackParamList, "MainPartyScreen">>();
    
    const { eventName, facilityName, startDate, endDate } = route.params;

    return (
        <View className="flex-1 bg-white">
            <PartyHeader
                eventName={eventName}
                facilityName={facilityName}
                startDate={startDate}
                endDate={endDate}
            />
        </View>
    );
}