import "../global.css";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { setOnLogoutListener, clearOnLogoutListener } from "@/apis/auth/axiosWithAuthorization";

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'splash', //첫 화면
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Paperlogy 폰트 등록(키 이름 = 사용할 fontFamily)
    'Paperlogy-Thin': require('../assets/fonts/Paperlogy-1Thin.ttf'),
    'Paperlogy-ExtraLight': require('../assets/fonts/Paperlogy-2ExtraLight.ttf'),
    'Paperlogy-Light': require('../assets/fonts/Paperlogy-3Light.ttf'),
    'Paperlogy-Regular': require('../assets/fonts/Paperlogy-4Regular.ttf'),
    'Paperlogy-Medium': require('../assets/fonts/Paperlogy-5Medium.ttf'),
    'Paperlogy-SemiBold': require('../assets/fonts/Paperlogy-6SemiBold.ttf'),
    'Paperlogy-Bold': require('../assets/fonts/Paperlogy-7Bold.ttf'),
    'Paperlogy-ExtraBold': require('../assets/fonts/Paperlogy-8ExtraBold.ttf'),
    'Paperlogy-Black': require('../assets/fonts/Paperlogy-9Black.ttf'),
    //SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  //로그아웃 리스너
  useEffect(() => {
    setOnLogoutListener(() => router.replace("/login"));
    return () => clearOnLogoutListener();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" options={{ animation: "fade" }}/>
          <Stack.Screen name="login" options={{ animation: "fade" }}/>
          <Stack.Screen name="mainTabs" options={{ animation: "fade" }} />
          <Stack.Screen name="settings" options={{ animation: "slide_from_right" }} />
        </Stack>
    </QueryClientProvider>
  );
}
