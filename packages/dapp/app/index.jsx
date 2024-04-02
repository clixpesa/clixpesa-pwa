import { Box, VStack, Button, Heading, Spacer } from 'native-base';
import { Link } from 'expo-router';

const WelcomePage = () => {
  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="flex-end">
      <Box width="75%" mt="3/4">
        <Heading textAlign="center" color="coolGray.700">
          Step into the future of money with Clixpesa
        </Heading>
      </Box>
      <Spacer />
      <VStack alignItems="center" space={3} mb="16" width="100%">
        <Link href={'/signup'} asChild>
          <Button
            variant="solid"
            rounded="3xl"
            bg="primary.700"
            _text={{ color: 'white', fontWeight: 'semibold', mb: '0.5', fontSize: 'md' }}
            minW="75%"
          >
            Create New Account
          </Button>
        </Link>
        <Link href={'/import'} asChild>
          <Button
            variant="subtle"
            rounded="3xl"
            pr="4"
            minW="75%"
            _text={{ color: 'primary.800', fontWeight: 'semibold', mb: '0.5', fontSize: 'md' }}
          >
            Use Existing Account
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
