import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./NavigationRef";

import CreatePartyScreen from "../create-party";
import PartyListScreen from "../party-list";
import MainScreen from "../main-s";
import EventListScreen from "../event-list";
import MyScreen from "../my-s";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName="MainScreen"
            >
                <Stack.Screen name="CreatePartyScreen" component={CreatePartyScreen} />
                <Stack.Screen name="PartyListScreen" component={PartyListScreen} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="EventListScreen" component={EventListScreen} />
                <Stack.Screen name="MyScreen" component={MyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}