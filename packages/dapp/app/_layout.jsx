//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeBaseProvider, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { TouchableOpacity } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const router = useRouter();
  const [loaded, setIsLoaded] = useState(true);
  const isSignedIn = false;
  const segments = useSegments();

  /*const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);*/

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    //if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/home');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="import"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="verifyphone"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="setpasscode"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="linkphone"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(authenticated)/home" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" />
      <RootLayout />
    </NativeBaseProvider>
  );
}
