import { Box, HStack, Pressable, Text, VStack, Spacer, Button } from 'native-base';
import { CodeInput, ResendTimer } from '../components';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { auth } from '../firebase.config';

const VerifyPhone = ({ route }) => {
  const router = useRouter();
  const { phone, id } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [codeReady, setCodeReady] = useState(false);

  const handleOnFullFill = async () => {
    setIsLoading(true);
    try {
      const credential = new PhoneAuthProvider.credential(id, code);
      const res = await signInWithCredential(auth, credential);
      console.log('User:', res.user);
      setIsLoading(false);
      //router.replcae('/setpasscode');
    } catch (error) {
      console.log('Error:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <Box flex={1} bg="white" alignItems="center">
      <VStack space={3} mx={6} mt={2}>
        <Text fontSize="2xl" fontWeight="medium" mb={6}>
          Verify your phone number
        </Text>
        {isError ? (
          <Text color="danger.600" fontSize="md">
            There was a problem verifying your phone number. Please try again.
          </Text>
        ) : (
          <Text color="muted.500" fontSize="md">
            A 6-digit code has been sent to {phone}. Please enter the code below.
          </Text>
        )}
        <Box my={2} alignSelf="center">
          <CodeInput
            value={code}
            onTextChange={(code) => setCode(code)}
            onFulfill={(code) => {
              setCodeReady(true);
              setCode(code);
            }}
            autoFocus={true}
          />
        </Box>
        <ResendTimer seconds={55} onResend={() => console.log('Code resent')} />
      </VStack>
      <Spacer />
      <Button
        isLoading={isLoading}
        spinnerPlacement="end"
        isLoadingText="Verifying"
        rounded="3xl"
        pr="4"
        minW="65%"
        my={16}
        _text={{
          color: 'white',
          fontWeight: 'semibold',
          fontSize: 'md',
          mb: '0.5',
        }}
        onPress={() => handleOnFullFill()}
      >
        Verify Phone
      </Button>
    </Box>
  );
};

export default VerifyPhone;
