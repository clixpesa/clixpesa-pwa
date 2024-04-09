import { Box, Text } from 'native-base';
import React from 'react';
import { Button } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../../firebase.config';

const Home = () => {
  const GetUserByNumbeer = () => {
    //get user by phone number
    try {
      const phone = '+254712345678';
      const user = getAuth.getUser(phone);
      console.log(user);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>Welcome Home</Text>
      <Text>{auth.currentUser.phoneNumber}</Text>
      <Button title="GetUserByNumbeer" onPress={() => GetUserByNumbeer()} />
      <Button title="Logout" onPress={() => signOut(auth)} />
    </Box>
  );
};

export default Home;
