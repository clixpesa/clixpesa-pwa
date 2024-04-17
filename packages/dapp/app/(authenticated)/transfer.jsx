import {
  Box,
  FormControl,
  Text,
  VStack,
  Input,
  HStack,
  Button,
  Pressable,
  Spacer,
  useDisclose,
  Stack,
  Select,
  Avatar,
  Icon,
} from 'native-base';
import { useState, useRef } from 'react';
//import { utils } from 'ethers';
//import { SuccessModal } from 'dapp/components';
import { Octicons } from '@expo/vector-icons';
//import { tranferFunds, tranferNativeToken } from 'dapp/contracts';
import { useRouter } from 'expo-router';
import { rates } from '../../utils';

export default function TransferFunds({ navigation, route }) {
  const amtInputRef = useRef();
  const router = useRouter();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('CUSD');
  const [isKES, setIsKES] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const approxAmount =
    token === 'CUSD'
      ? isKES
        ? (amount / rates.CUSDKES).toFixed(2)
        : (amount * rates.CUSDKES).toFixed(2)
      : isKES
        ? (amount / rates.CELOKES).toFixed(2)
        : (amount * rates.CELOKES).toFixed(2);
  let textSize = '5xl';
  if (amount.length > 6 && amount.length <= 8) {
    textSize = '4xl';
  } else if (amount.length >= 9) {
    textSize = '3xl';
  }

  const handleTransaction = async () => {
    if (token === 'CELO') {
      const thisAmount = isKES ? amount / rates.CELOKES : amount;
      const thisTx = '0xhgsdt'; //await tranferNativeToken(recipient, thisAmount.toString());
      router.navigate('confirmTx', { thisTx, recipient, thisAmount, token });
    } else {
      const thisAmount = isKES ? amount / rates.CUSDKES : amount;
      const thisTx = '0xhgsdt'; //await tranferFunds(recipient, thisAmount.toString());
      router.navigate('confirmTx', { thisTx, recipient, thisAmount, token });
    }
  };

  return (
    <Box flex={1} bg="muted.100" alignItems="center">
      <VStack width="95%" mt={3} space={1}>
        <Box
          bg="white"
          p={3}
          roundedTop="2xl"
          roundedBottom="md"
          borderWidth={1}
          borderColor="gray.100"
        >
          <FormControl.Label px={3}>Recipient</FormControl.Label>
          <Input
            placeholder="address"
            size="md"
            mt={2}
            value={recipient}
            onChangeText={(text) => setRecipient(text)}
          />
        </Box>
        <VStack
          bg="white"
          p={3}
          roundedTop="md"
          roundedBottom="2xl"
          borderWidth={1}
          borderColor="gray.100"
          space={2}
        >
          <Select placeholder="CUSD" onValueChange={(value) => setToken(value)}>
            <Select.Item value="CELO" label="CELO" />
            <Select.Item label="CUSD" value="CUSD" />
          </Select>

          <HStack mt={3} justifyContent="space-between" alignItems="center">
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
            <Pressable onPress={() => amtInputRef.current.focus()} width="70%">
              <Text fontSize="4xl" fontWeight="medium" textAlign="center">
                {isKES ? <Text color="muted.500">KSh. </Text> : null}
                {amount ? amount : '0'} {isKES ? null : <Text color="muted.500">{token}</Text>}
              </Text>
            </Pressable>
            <Pressable alignItems="center" onPress={() => setIsKES(!isKES)}>
              <Icon as={Octicons} name="sync" size="md" color="primary.600" />
              <Text fontSize="md" color="primary.600">
                {isKES ? 'KES' : token}
              </Text>
            </Pressable>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            {token === 'CELO' ? (
              <Text>
                Available:{' '}
                {(0) /*route.params.celoBal * 1*/
                  .toFixed(4)}{' '}
                CELO
              </Text>
            ) : (
              <Text>
                Available:{' '}
                {(0) /*route.params.cusdBal * 1*/
                  .toFixed(4)}{' '}
                CUSD
              </Text>
            )}
            <Text fontSize="md">≈ {approxAmount + (isKES ? ' ' + token : ' KES')} </Text>
          </HStack>
        </VStack>
      </VStack>
      <Spacer />
      <Button
        isDisabled={amount && recipient ? false : true}
        isLoading={isLoading}
        rounded="3xl"
        pr="4"
        width="75%"
        mb="12"
        _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
        onPress={() => handleTransaction()}
      >
        Review
      </Button>
    </Box>
  );
}
