import { Stack } from "expo-router";

export default function SignupLayout() {
    return (
        <Stack screenOptions={{ headerShown: false}}>
            <Stack.Screen name="nickname" />
            {/* <Stack.Screen name="style-test" options={{ animation: "none"}} /> */}
        </Stack>
    )
}