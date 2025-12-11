import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainEventScreen from "../main-e";
import MainPartyScreen from "../main-p";

export type MainStackParamList = {
  MainEventScreen: undefined;
  MainPartyScreen: {
    eventId: string;
    eventName: string;
    facilityName: string;
    startDate: string;
    endDate: string;
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainEventScreen" component={MainEventScreen} />
      <Stack.Screen name="MainPartyScreen" component={MainPartyScreen} />
    </Stack.Navigator>
  );
}