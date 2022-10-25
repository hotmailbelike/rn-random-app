import {StyleSheet} from 'react-native';
import {
  Container,
  FormControl,
  Heading,
  Button,
  Stack,
  Input,
  useToast,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';
import React, {useContext, useState} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from './AuthProvider';
import {isEmailValid} from '../utils';

const SignUp = () => {
  const {signUp} = useContext(AuthContext);

  const toast = useToast();

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const showToast = (message, options = {}) => {
    toast.show({
      placement: 'top',
      duration: 3000,
      backgroundColor: 'red.700',
      title: message,
      ...options,
    });
  };

  const handleUser = (key, value) => setUser({...user, [key]: value});

  const handleSignUp = () => {
    const {email, password, confirmPassword} = user;

    if (!email || !password || !confirmPassword) {
      return showToast('Please fill in all details');
    }

    if (!isEmailValid(email)) {
      return showToast('Please enter a valid email');
    }

    if (password !== confirmPassword) {
      return showToast('Passwords do not match');
    }

    signUp(user.email, user.password).then(res => {
      if (res.error) {
        return showToast('Something went wrong. Please try again');
      }
    });
  };

  return (
    <KeyboardAvoidingView
      paddingBottom={10}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <Container
          mt={20}
          alignSelf={'center'}
          width={'100%'}
          alignItems={'center'}>
          <Heading>Register</Heading>

          <FormControl marginTop={3}>
            <Stack mx="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                autoCapitalize="none"
                value={user.email}
                type="text"
                placeholder="Enter Email"
                onChangeText={text => handleUser('email', text.toLowerCase())}
              />
            </Stack>
          </FormControl>
          <FormControl marginTop={3}>
            <Stack mx="4">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={user.password}
                type="password"
                defaultValue=""
                placeholder="Enter Password"
                onChangeText={text => handleUser('password', text)}
              />
            </Stack>
          </FormControl>
          <FormControl marginTop={3}>
            <Stack mx="4">
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                value={user.confirmPassword}
                type="password"
                defaultValue=""
                placeholder="Enter Password"
                onChangeText={text => handleUser('confirmPassword', text)}
              />
            </Stack>
          </FormControl>
          <Button
            leftIcon={
              <MaterialCommunityIcon
                name="account-plus"
                color="white"
                size={20}></MaterialCommunityIcon>
            }
            borderRadius={30}
            marginTop={5}
            width={'50%'}
            colorScheme={'darkBlue'}
            onPress={handleSignUp}>
            Sign Up
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
