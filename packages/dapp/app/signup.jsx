import {
  Box,
  Text,
  Button,
  FormControl,
  Stack,
  HStack,
  Icon,
  Spacer,
  VStack,
  Input,
  ChevronDownIcon,
  Pressable,
} from 'native-base';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const SignUp = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmission = () => {
    console.log('Phone number:', phoneNo);
    const userPhoneNo = `+254${phoneNo}`;
    router.push({
      pathname: '/verifyphone',
      params: { phone: userPhoneNo },
    });
    //navigation.navigate('verifyphone', { phone: userPhoneNo, signin: 'true' });
  };
  return (
    <Box flex={1} bg="white">
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        mx={8}
        textAlign="left"
        color="coolGray.800"
        mt={2}
      >
        Let's get started
      </Text>
      <Stack mx={8} my={6}>
        <Text fontSize="md">Enter your phone number to get started.</Text>
        <Input
          my={3}
          InputLeftElement={
            <Pressable
              onPress={() => {
                console.log('pressed');
              }}
              p={2}
            >
              <HStack alignItems="center">
                <Text fontSize="xl" ml={3} mr={1} mb={0.5}>
                  +254
                </Text>
                <ChevronDownIcon size="xs" />
              </HStack>
            </Pressable>
          }
          placeholder="712345678"
          //size="lg"
          fontSize="xl"
          keyboardType="numeric"
          autoFocus={true}
          spellCheck={false}
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
          //onEndEditing={() => validateNo()}
        />
        <Text color="muted.500">
          Depending on your mobile network and country, standard rates and taxes may apply.
        </Text>
      </Stack>
      <Spacer />
      <VStack alignItems="center" space={3} mt="10" mb="16" width="100%">
        <Button
          rounded="3xl"
          isLoading={isLoading}
          pr="4"
          minW="75%"
          _text={{ fontWeight: 'semibold', mb: '0.5', fontSize: 'md' }}
          onPress={() => {
            handleSubmission();
          }}
          isLoadingText="Signing up..."
        >
          Create Account
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp;
