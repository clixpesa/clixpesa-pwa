//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeBaseProvider, Icon, Spinner, VStack, Box, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { Pressable } from 'react-native';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

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
  const [loaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
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
    onAuthStateChanged(auth, (user) => {
      console.log('User:', user);
      //console log user session period
      if (user) {
        setUser(user);
        setHasAccount(true);
      } else {
        setHasAccount(false);
      }
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    //if (!isLoaded) return;
    SplashScreen.hideAsync();
    const inAuthGroup = segments[0] === '(authenticated)';

    if (loaded && hasAccount && !inAuthGroup) {
      isSignedIn
        ? router.replace('/(authenticated)/home')
        : router.replace('/(authenticated)/login');
    } else if (!hasAccount && loaded) {
      router.replace('/');
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <Box flex={1} bg="white" justifyContent="center">
        <VStack mx="20" space={3} alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="md">Getting stuff ready...</Text>
        </VStack>
      </Box>
    );
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
            <Pressable onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </Pressable>
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
            <Pressable onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </Pressable>
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
            <Pressable onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </Pressable>
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
            <Pressable onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </Pressable>
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
            <Pressable onPress={router.back}>
              <Icon as={Ionicons} name="arrow-back" size="2xl" color="coolGray.800" ml="4" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="(authenticated)/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="(authenticated)/login"
        options={{ title: '', headerBackTitle: '', headerShadowVisible: false }}
      />
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
