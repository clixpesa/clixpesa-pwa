import {
  Box,
  Text,
  Image,
  FormControl,
  Stack,
  Input,
  Button,
  HStack,
  Icon,
  Heading,
  Select,
  CheckIcon,
  Spacer,
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
//import { setSpaceInfo } from '../store/spaces/spaces.slice';
//import { getSigner } from '../config/provider';

export default function CreateSpace() {
  //useSelector((state) => state.wallet.walletInfo.address);
  const navigation = useRouter();
  const [thisAddress, setThisAddress] = useState('');
  const [spaceInfo, setSpaceInfo] = useState({});
  const suggestions = [
    'Savings',
    'Vacation',
    'Chama',
    'TMK Wanaume',
    'Sherehe',
    'Emergency',
    'Masomo',
  ];
  const dispatch = useDispatch();
  const [spaceName, setSpaceName] = useState('');
  const [membersCount, setMembersCount] = useState('');
  /*
  useEffect(() => {
    const getAddress = async () => {
      const signer = getSigner();
      const address = await signer.getAddress();
      setThisAddress(address);
      console.log(address);
    };
    getAddress();
  }, []);*/

  return (
    <Box flex={1} bg="muted.100">
      <Box bg="white" minH="30%" p={6}>
        <Text fontSize="2xl" fontWeight="bold" color="coolGray.700">
          Set up your Space
        </Text>
        <Icon
          position="absolute"
          as={MaterialCommunityIcons}
          name="image-plus"
          size="xl"
          alignSelf="flex-end"
          bottom={6}
        />
      </Box>
      <FormControl alignItems="center" mt={2}>
        <Stack space={2} w="80%">
          <Stack mt={2}>
            <FormControl.Label>Name your space</FormControl.Label>
            <Input
              bg="white"
              p={3}
              placeholder="Savings"
              rounded="2xl"
              size="lg"
              value={spaceName}
              onChangeText={(text) => setSpaceName(text)}
            />
          </Stack>
          <HStack space={3} flexWrap="wrap" mt={3}>
            {suggestions.map((item) => {
              return (
                <Button
                  size="sm"
                  variant="subtle"
                  bg="primary.100"
                  shadow="1"
                  mb={2}
                  key={item}
                  onPress={() => setSpaceName(item)}
                >
                  {item}
                </Button>
              );
            })}
          </HStack>
          <Stack mt={2}>
            <FormControl.Label>How many members?</FormControl.Label>
            <Input
              bg="white"
              p={3}
              placeholder="atleast 2"
              rounded="2xl"
              size="lg"
              value={membersCount}
              onChangeText={(text) => setMembersCount(text)}
              keyboardType="numeric"
            />
          </Stack>
        </Stack>

        <Stack alignItems="center" width="95%" mt="40%">
          <Button
            rounded="3xl"
            disabled={membersCount ? false : true}
            w="60%"
            _text={{ color: 'primary.100', fontWeight: 'semibold', mb: '0.5' }}
            onPress={() => {
              dispatch(setSpaceInfo({ spaceName, thisAddress, membersCount }));
              navigation.navigate('setSpaceGoal');
            }}
          >
            Continue
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
