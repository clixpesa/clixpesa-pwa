import { Box, VStack, Spinner, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { PIN_BLOCKLIST } from '../config';
import { CodeInput } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken } from '../redux/slices/essential.slice';
import { useRouter } from 'expo-router';

const SetPasscode = () => {
  const tokenState = useSelector((state) => state.essential.tokenState);
  const isLoggedIn = useSelector((state) => state.essential.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeReady, setIsCodeReady] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);
  //const [userToken, setUserToken] = useState('');
  const onFullCode1 = (code) => {
    if (isPinValid(code)) {
      setIsVerifying(true);
      console.log('Pin is Valid');
    } else {
      console.log('Pin is Invalid');
      setCode1('');
    }
  };
  const onFullCode2 = (code) => {
    console.log('Code 2:', code);
    setIsMismatch(false);
    if (code1 === code) {
      console.log('Pin session is done');
      console.log('Token STATE:', tokenState);
      setIsLoading(true);
      setCode1('');
      if (code2) dispatch(setUserToken({ code: code2, state: tokenState }));
      setCode2('');
      setIsVerifying(false);
    } else {
      console.log('Pin does not match');
      setIsMismatch(true);
      setIsCodeReady(false);
      setCode2('');
    }
  };

  useEffect(() => {
    if (isCodeReady) {
      setTimeout(() => {
        onFullCode2(code2);
      }, 500);
    }
  }, [isCodeReady]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
      router.replace('(authenticated)/home');
    }
  }, [isLoggedIn]);
  return (
    <Box flex={1} bg="white">
      {isLoading ? (
        <VStack mx="20" my="40%" space={3} alignItems="center">
          <Spinner size="lg" />
          <Text fontSize="md">Setting up Account...</Text>
        </VStack>
      ) : (
        <>
          {isVerifying ? (
            <Box>
              <Box mx="10">
                <Text fontSize="2xl" fontWeight="medium" my={6}>
                  Re-enter the passcode
                </Text>
                {isMismatch ? (
                  <Text mb="3" fontSize="md" color="danger.600">
                    Passcode did not Match! Please input the passcode again to confirm.
                  </Text>
                ) : (
                  <Text mb="3" fontSize="md">
                    Please input the passcode again to confirm.
                  </Text>
                )}
                <CodeInput
                  value={code2}
                  autoFocus={true}
                  password={true}
                  onTextChange={(code) => setCode2(code)}
                  onFulfill={(code) => {
                    setCode2(code);
                    setIsCodeReady(true);
                  }}
                />
              </Box>

              <Text mx="10" mt="5">
                You will use this passcode to authorize transactions and sign into your account.
                Please keep it safe.
              </Text>
            </Box>
          ) : (
            <Box>
              <Box mx="10">
                <Text fontSize="2xl" fontWeight="medium" my={6}>
                  Set a passcode
                </Text>
                <Text mb="3" fontSize="md">
                  You will use this passcode to authorize transactions and sign into your account.
                  Please keep it safe.
                </Text>
                <CodeInput
                  value={code1}
                  password={true}
                  autoFocus={true}
                  onTextChange={(code) => setCode1(code)}
                  onFulfill={(code) => onFullCode1(code)}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SetPasscode;

function isPinValid(pin) {
  return /^\d{6}$/.test(pin) && !PIN_BLOCKLIST.includes(pin);
}
