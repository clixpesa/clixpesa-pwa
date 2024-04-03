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
import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { auth } from '../firebase.config';

const SignUp = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('Recaptcha resolved');
        },
      });
      setIsError(false);
    } catch (error) {
      console.log('Error:', error);
      window.recaptchaVerifier = null;
      window.alert('An error occurred. Please try again.');
      setIsError(true);
    }
  }, []);

  const handleSubmission = () => {
    setIsLoading(true);
    const gPhonNo = phoneNo.replace(/^0+/, '');
    const userPhoneNo = `+254${gPhonNo}`;

    if (isValidPhoneNumber(userPhoneNo)) {
      signInWithPhoneNumber(auth, userPhoneNo, window.recaptchaVerifier)
        .then((confirmation) => {
          setIsLoading(false);
          console.log('Verification ID:', confirmation.verificationId);
          router.push({
            pathname: '/verifyphone',
            params: { phone: userPhoneNo, id: confirmation.verificationId },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          window.alert('An error occurred. Please try again.');
          console.log('Error:', error);
        });
    } else {
      setIsLoading(false);
      setIsError(true);
      window.alert('Please enter a valid phone number.');
    }
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
      <div id="sign-in-button"></div>
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
          placeholder="7XXXXXXXX"
          //size="lg"
          fontSize="xl"
          inputMode="numeric"
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
