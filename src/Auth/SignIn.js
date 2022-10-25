import {StyleSheet} from 'react-native';
import {
  Container,
  FormControl,
  Heading,
  Button,
  Stack,
  Input,
  Text,
  useToast,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';

import React, {useContext, useState} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from './AuthProvider';
import {isEmailValid} from '../utils';

const SignIn = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const toast = useToast();

  const showToast = message => {
    toast.show({
      placement: 'top',
      duration: 3000,
      backgroundColor: 'red.700',
      title: message,
    });
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleUser = (key, value) => setUser({...user, [key]: value});

  const handleSignIn = () => {
    const {email, password} = user;

    if (!email || !password) {
      return showToast('Please fill in all details');
    }

    if (!isEmailValid(email)) {
      return showToast('Please enter a valid email');
    }

    signIn(user.email, user.password).then(res => {
      if (res.error) {
        return showToast('Invalid Credentials');
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
