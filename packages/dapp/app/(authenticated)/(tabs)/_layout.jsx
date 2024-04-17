import { Tabs, useRouter } from 'expo-router';
import { Icon, Box, Text, HStack, Pressable, Avatar } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const BottomTabs = () => {
  const router = useRouter();
  const TabIcons = {
    home: ['home', 'home-outline'],
    spaces: ['people', 'people-outline'],
    account: ['person', 'person-outline'],
  };

  const TabScreenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      const [iconFill, iconLine] = TabIcons[route.name];
      return (
        <Box bg={focused ? 'primary.200' : '#ffffff'} rounded="2xl" px="5" py="1" mt="1">
          <Icon
            as={Ionicons}
            name={focused ? iconFill : iconLine}
            size={22}
            color="primary.700"
            key={route.name}
          />
        </Box>
      );
    },
    tabBarLabel: () => {
      return (
        <Text fontSize="xs" color="primary.900" key={route.name} mb="1">
          {route.name}
        </Text>
      );
    },
    headerLeft: () => <AccPressable />,
    headerRight: () => <HeaderRightIcons />,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      height: 60,
    },
  });

  const HeaderRightIcons = () => {
    return (
      <HStack space="5" mr="5">
        {/*<Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="donut-chart-fill" />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('DummyModal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Icon size={24} name="star-fill" />
      </Pressable>*/}
        <Pressable
          onPress={() => console.log('Notifications')}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Icon as={Ionicons} size="2xl" name="notifications" color="trueGray.600" />
        </Pressable>
      </HStack>
    );
  };

  const AccPressable = () => {
    const { initials } = useSelector((s) => s.essential.userDetails);
    return (
      // fix avatar text color to primary.700
      <Pressable
        onPress={() => router.navigate('/(authenticated)/(tabs)/account')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <Avatar bg="primary.200" ml="5" size="sm" _text={{ color: 'primary.800' }}>
          {initials}
        </Avatar>
      </Pressable>
    );
  };

  return (
    <Tabs screenOptions={TabScreenOptions}>
      <Tabs.Screen name="home" options={{ headerTitle: 'Clixpesa' }} />
      <Tabs.Screen name="spaces" options={{ headerTitle: 'Spaces' }} />
      <Tabs.Screen name="account" options={{ headerTitle: 'My Account' }} />
    </Tabs>
  );
};

export default BottomTabs;
