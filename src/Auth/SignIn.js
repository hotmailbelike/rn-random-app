import {StyleSheet} from 'react-native';
import {
  Container,
  FormControl,
  Heading,
  Button,
  Stack,
  Input,
  Text,
} from 'native-base';

import React, {useContext, useState} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from './AuthProvider';

const SignIn = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleUser = (key, value) => setUser({...user, [key]: value});

  const handleSignIn = () => {
    signIn(user.email, user.password);
  };
  return (
    <Container
      mt={20}
      alignSelf={'center'}
      width={'100%'}
      alignItems={'center'}>
      <Heading>Welcome Back</Heading>

      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>Email</FormControl.Label>
          <Input
            autoCapitalize="none"
            type="text"
            placeholder="Enter Email"
            value={user.email.toLowerCase()}
            onChangeText={text => handleUser('email', text.trim())}
          />
        </Stack>
      </FormControl>
      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            placeholder="Enter Password"
            value={user.password}
            onChangeText={text => handleUser('password', text)}
          />
        </Stack>
      </FormControl>
      <Button
        leftIcon={
          <MaterialCommunityIcon
            name="login"
            color="white"
            size={20}></MaterialCommunityIcon>
        }
        borderRadius={30}
        marginTop={5}
        width={'50%'}
        colorScheme={'darkBlue'}
        onPress={handleSignIn}>
        Sign in
      </Button>

      <Button
        borderRadius={30}
        onPress={() => navigation.navigate('Forgot Password')}
        marginTop={2}
        width={'50%'}
        variant={'unstyled'}>
        <Text color={'blue.700'}>Forgot Password?</Text>
      </Button>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
