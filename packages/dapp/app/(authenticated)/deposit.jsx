import { Box, Text, HStack, Icon, Divider, Pressable, Input, Select } from 'native-base';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Deposit() {
  const [amount, setAmount] = useState(0);
  const [isKES, setIsKES] = useState(true);
  const amtInputRef = useRef(null);
  const router = useRouter();
  return (
    <Box flex={1} bg="white" alignItems="center">
      <HStack mt={6} justifyContent="space-between" alignItems="center">
        <Input
          position="absolute"
          alignSelf="center"
          right="25%"
          width="50%"
          variant="unstyled"
          placeholder=""
          size="2xl"
          textAlign="center"
          style={{ color: 'white' }}
          mt={2}
          caretHidden={true}
          autoFocus={true}
          ref={amtInputRef}
          keyboardType="phone-pad"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <Pressable onPress={() => amtInputRef.current.focus()} width="full">
          <Text fontSize="4xl" fontWeight="medium" textAlign="center">
            {isKES ? <Text color="muted.500">KSh. </Text> : null}
            {amount ? amount : '0'} {isKES ? null : <Text color="muted.500">USD</Text>}
          </Text>
        </Pressable>
        <Pressable alignItems="center" onPress={() => setIsKES(!isKES)}>
          <Icon as={Octicons} name="sync" size="md" color="primary.600" />
          <Text fontSize="md" color="primary.600">
            {isKES ? 'KES' : 'USD'}
          </Text>
        </Pressable>
      </HStack>
      <Divider width="85%" alignSelf="center" my={2} />
      <Text fontSize="md" alignSelf="flex-start" ml="10%">
        Add {amount ? amount + (isKES ? ' KES' : ' USD') : 'Funds'} with
      </Text>
      <HStack mx="4%" justifyContent="space-between" my={4}>
        <Pressable
          bg="green.200"
          p={4}
          rounded={16}
          width="45%"
          mx={2}
          alignItems="center"
          //onPress={() =>
          //  WebBrowser.openBrowserAsync('https://sandbox-pay.fonbnk.com/?source=m0I24mr')
          //}
          onPress={() =>
            router.navigate('fromFonbank', {
              provider: 'mpesa',
              currency: isKES ? 'airtime' : 'usdc',
              amount,
            })
          }
        >
          <HStack space={2} alignItems="center">
            <Icon
              as={MaterialCommunityIcons}
              name="cellphone-text"
              size="3xl"
              color="primary.800"
            />
            <Text fontWeight="medium" fontSize="lg" textAlign="center" color="primary.800">
              MPesa
            </Text>
          </HStack>
        </Pressable>
        <Pressable
          bg="primary.100"
          p={4}
          rounded={16}
          width="45%"
          mx={2}
          alignItems="center"
          onPress={() =>
            router.navigate('fromFonbank', {
              provider: 'carrier',
              currency: isKES ? 'airtime' : 'usdc',
              amount,
            })
          }
        >
          <HStack space={2} alignItems="center">
            <Icon
              as={MaterialCommunityIcons}
              name="cellphone-message"
              size="3xl"
              color="primary.800"
            />
            <Text fontWeight="medium" fontSize="lg" textAlign="center" color="primary.700">
              Airtime
            </Text>
          </HStack>
        </Pressable>
      </HStack>

      <Text fontSize="md" alignSelf="flex-start" ml="10%" mt={3}>
        Or Deposit from
      </Text>
      <Pressable
        onPress={() => Alert.alert('Coming soon!')}
        alignSelf="flex-start"
        ml="10%"
        width="80%"
        mt={4}
      >
        <HStack space={3} alignItems="center" py={3}>
          <Icon as={MaterialCommunityIcons} name="wallet-outline" size="xl" color="text.600" />
          <Text fontWeight="medium" fontSize="md">
            Valora Wallet
          </Text>
        </HStack>
      </Pressable>
      <Pressable
        onPress={() => router.navigate('(authenticated)/from-exchange')}
        alignSelf="flex-start"
        ml="10%"
        width="80%"
        my={2}
      >
        <HStack space={3} alignSelf="flex-start" alignItems="center" py={3}>
          <Icon as={Octicons} name="arrow-switch" size="xl" color="text.600" />
          <Text fontWeight="medium" fontSize="md">
            Exchange or Other wallet
          </Text>
        </HStack>
      </Pressable>
    </Box>
  );
}
