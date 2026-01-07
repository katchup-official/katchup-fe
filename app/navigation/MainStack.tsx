import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainEventScreen from "../main-screens/main-e";
import MainPartyScreen from "../main-screens/main-p";

export type MainStackParamList = {
  MainEventScreen: undefined;
  MainPartyScreen: {
    eventId: number;
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