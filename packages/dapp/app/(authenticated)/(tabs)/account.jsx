import {
  Text,
  Box,
  SectionList,
  Pressable,
  Divider,
  HStack,
  ChevronRightIcon,
  Icon,
  Stack,
  useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
//import * as WebBrowser from 'expo-web-browser';

const Account = ({ navigation }) => {
  const router = useRouter();
  const walletAddress = useSelector((s) => s.essential.hasAccount.address);
  const userNumber = useSelector((s) => s.essential.userDetails.phone);
  const toast = useToast();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletAddress);
    toast.show({
      title: 'Address copied to clipboard',
      status: 'success',
      duration: 2000,
      placement: 'top',
    });
  };

  const data = [
    {
      title: userNumber,
      icon: 'person',
      description: walletAddress,
      data: [
        {
          title: 'Edit Profile',
          action: 'edit-profile',
        },
        {
          title: 'Language',
          action: 'changeLanguage',
        },
      ],
    },
    {
      title: 'Security',
      icon: 'lock',
      description: '',
      data: [
        {
          title: 'Recovery Phrase',
          action: 'getRecoveryPhrase',
        },
        {
          title: 'Change Passcode',
          action: 'changePasscode',
        },
      ],
    },
    {
      title: 'About',
      icon: 'information-circle',
      data: [
        {
          title: 'About Us',
          action: 'about-us',
        },
        {
          title: 'Terms of Service',
          action: 'terms-conditions',
        },
        {
          title: 'Privacy Policy',
          action: 'privacy-policy',
        },
        {
          title: 'Licenses',
          action: 'licenses',
        },
      ],
    },
    {
      title: 'Logout',
      icon: 'log-out',
      description:
        "Remove your account from this device. You'll need your recovery phrase to log back in.",
      data: [
        {
          title: 'Logout',
          action: 'logout',
        },
      ],
    },
  ];

  return (
    <Box flex={1} bg="white" alignItems="center" justifyContent="center">
      <SectionList
        mx={3}
        width="95%"
        sections={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <>
            <Pressable
              py={3}
              onPress={() => {
                if (
                  item.action === 'logout' ||
                  item.action === 'licenses' ||
                  item.action === 'changeLanguage'
                ) {
                  console.log(item.action);
                } else if (
                  item.action === 'about-us' ||
                  item.action === 'terms-conditions' ||
                  item.action === 'privacy-policy'
                ) {
                  console.log(item.action);
                  //WebBrowser.openBrowserAsync('https://clixpesa.com/' + item.action);
                } else {
                  router.navigate('(authenticated)/' + item.action);
                }
              }}
              _pressed={{
                bg: 'muted.200',
              }}
            >
              <HStack justifyContent="space-between">
                <Text fontSize="md">{item.title}</Text>
                <ChevronRightIcon size="4" />
              </HStack>
            </Pressable>
            <Divider />
          </>
        )}
        renderSectionHeader={({ section: { title, icon, description } }) => (
          <Box maxW="90%" mt={3} mb={2}>
            {icon === 'person' ? (
              <HStack alignItems="center" space={6}>
                <Stack>
                  <Text fontSize="lg" textAlign="left">
                    {title}
                  </Text>
                  {description ? (
                    <Text fontSize="sm" maxW="90%">
                      {description}
                    </Text>
                  ) : null}
                </Stack>
                <Pressable p={3} mt={4} onPress={() => copyToClipboard()}>
                  <Icon as={Ionicons} name="copy-outline" size="lg" color="text.400" />
                </Pressable>
              </HStack>
            ) : (
              <>
                <Text fontSize="lg" textAlign="left">
                  {title}
                </Text>
                {description ? <Text fontSize="xs">{description}</Text> : null}
              </>
            )}
          </Box>
        )}
      />
    </Box>
  );
};

export default Account;
