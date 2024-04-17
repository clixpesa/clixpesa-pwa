import {
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Button,
  useToast,
} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { shortenAddress } from '../../utils';

export default function FromExchange() {
  const walletAddress = useSelector((s) => s.essential.hasAccount.address);
  //const shortAddress = shortenAddress(walletAddress, true, false);
  const userNumber = useSelector((s) => s.essential.userDetails.phone);
  const thistoast = useToast();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    console.log('Copied to clipboard');
    thistoast.show({
      title: 'Address copied to clipboard',
      status: 'success',
      duration: 2000,
      placement: 'top',
    });
  };
  return (
    <Box flex={1} bg="muted.50" alignItems="center">
      <Pressable mt={10}>
        <HStack alignItems="center" m={2}>
          <Text fontWeight="medium" fontSize="lg" mr={1}>
            Deposit CELO/CUSD
          </Text>
          <Icon as={Ionicons} name="caret-down-outline" size="sm" color="text.400" />
        </HStack>
      </Pressable>
      <Box alignSelf="center" alignItems="center" p={8} bg="white" minW="40%" rounded={16}>
        <QRCode value={walletAddress} size={150} />
      </Box>
      <VStack width="95%" bg="white" mt={3} rounded="2xl">
        <HStack p={3} justifyContent="space-between" justifyItems="center">
          <Box width="70%">
            <Text color="text.600">Wallet Address</Text>
            <Text fontWeight="medium">{walletAddress}</Text>
          </Box>
          <Pressable p={3} mt={4} onPress={() => copyToClipboard()}>
            <Icon as={Ionicons} name="ios-copy-outline" size="lg" color="text.400" />
          </Pressable>
        </HStack>
        <Divider width="85%" alignSelf="center" />
        <HStack p={3} justifyContent="space-between" justifyItems="center">
          <Box width="70%">
            <Text color="text.600">Network</Text>
            <Text fontWeight="medium">Alfajores Testnet (CELO & ERC20)</Text>
          </Box>
          <Pressable p={3}>
            <Icon as={Ionicons} name="md-swap-horizontal" size="lg" color="text.400" />
          </Pressable>
        </HStack>
        <Divider width="85%" alignSelf="center" />
        <Box pl={3} py={3} pr={6}>
          <HStack justifyContent="space-between">
            <Text>Minimum deposit</Text>
            <Text fontWeight="medium">1.00 CUSD OR CELO</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Expected arrival</Text>
            <Text fontWeight="medium">~2 block confirmations</Text>
          </HStack>
        </Box>
      </VStack>
      <Spacer />
      <HStack space={3} bottom="10">
        <Button
          variant="subtle"
          bg="primary.100"
          rounded="3xl"
          pr="4"
          minW="40%"
          _text={{ color: 'primary.700', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => console.log('Share image')}
        >
          Save Image
        </Button>
        <Button
          rounded="3xl"
          pr="4"
          minW="40%"
          _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
          onPress={() => console.log('Share Address')}
        >
          Share Address
        </Button>
      </HStack>
    </Box>
  );
}
