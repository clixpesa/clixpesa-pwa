import { useEffect, useState } from 'react';
import { Box, Text, VStack, Button, Spacer, FormControl, Input } from 'native-base';
import { useRouter } from 'expo-router';

const Import = () => {
  const [phrase, setPhrase] = useState(
    'join exile know annual emotion chaos raw grain virtual legend link addict neutral access deer ozone scrub then mixture march profit zebra smooth churn',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const router = useRouter();

  const handleSubmit = async ({ phrase }) => {
    setIsLoading(true);
    console.log('Phrase:', phrase);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/linkphone');
    }, 2000);
  };

  return (
    <Box flex={1} bg="#fff" alignItems="center">
      <Text fontSize="xl" fontWeight="medium" my={6}>
        Enter your recovery (seed) phrase.
      </Text>
      <VStack space={3} alignItems="center">
        <Input
          h="40"
          w="75%"
          py={4}
          isDisabled={isLoading}
          placeholder="apple mango passion ..."
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          autoFocus={true}
          fontSize="lg"
          lineHeight="md"
          textAlign="center"
          type="submit"
          value={phrase.toLowerCase()}
          onChangeText={(text) => setPhrase(text)}
        />
        <Text maxW="75%">
          Your recovery pharce is a 24-word phrase that you wrote down and saved when you setup your
          account. Please enter it here to restore your account.
        </Text>
      </VStack>
      <VStack alignItems="center" space={3} my="10" width="100%">
        <Button
          variant={isLoading ? 'subtle' : null}
          rounded="3xl"
          pr="4"
          minW="75%"
          _text={{
            color: isLoading ? 'primary.600' : 'primary.100',
            fontWeight: 'semibold',
            mb: '0.5',
            fontSize: 'md',
          }}
          onPress={() => handleSubmit({ phrase })}
          isLoading={isLoading}
          spinnerPlacement="end"
          isLoadingText="Importing Account"
        >
          Import Account
        </Button>
      </VStack>
    </Box>
  );
};

export default Import;
