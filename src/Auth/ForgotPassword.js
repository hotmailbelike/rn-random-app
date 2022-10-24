import {StyleSheet} from 'react-native';
import {
  Container,
  FormControl,
  Heading,
  Button,
  Stack,
  Input,
} from 'native-base';
import React, {useContext, useState} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from './AuthProvider';

const ForgotPassword = () => {
  const {requestPasswordReset} = useContext(AuthContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleUser = (key, value) => setUser({...user, [key]: value});

  const handleRequestPasswordReset = () => {
    requestPasswordReset(user.email);
  };

  return (
    <Container
      mt={20}
      alignSelf={'center'}
      width={'100%'}
      alignItems={'center'}>
      <Heading>Reset your password</Heading>

      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>Email</FormControl.Label>
          <Input
            autoCapitalize="none"
            type="email"
            placeholder="Enter Email"
            value={user.email}
            onChangeText={text => handleUser('email', text.trim())}
          />
        </Stack>
      </FormControl>
      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>New Password</FormControl.Label>
          <Input
            type="password"
            defaultValue=""
            placeholder="Enter New Password"
          />
        </Stack>
      </FormControl>
      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>Confirm New Password</FormControl.Label>
          <Input type="password" defaultValue="" placeholder="Enter Password" />
        </Stack>
      </FormControl>
      <Button
        leftIcon={
          <MaterialCommunityIcon
            name="email-receive-outline"
            color="white"
            size={20}></MaterialCommunityIcon>
        }
        borderRadius={30}
        marginTop={5}
        width={'80%'}
        colorScheme={'info'}
        onPress={handleRequestPasswordReset}>
        Request Reset Password
      </Button>
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
