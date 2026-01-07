import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseEventScreen from "../main-screens/create-e";
import CreatePartyScreen from "../main-screens/create-p";

export type CreatePartyStackParamList = {
  ChooseEventScreen: undefined;
  CreatePartyScreen: {
    eventId: number;
    eventName: string;
    facilityName: string;
    startDate: string;
    endDate: string;
  }
};

const Stack = createNativeStackNavigator<CreatePartyStackParamList>();

export default function CreatePartyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseEventScreen" component={ChooseEventScreen}/>
      <Stack.Screen name="CreatePartyScreen" component={CreatePartyScreen}/>
    </Stack.Navigator>
  );
}