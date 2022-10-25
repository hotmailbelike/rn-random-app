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
import {isEmailValid} from '../utils';

import {AuthContext} from './AuthProvider';

const ForgotPassword = ({navigation}) => {
  const {requestPasswordReset} = useContext(AuthContext);

  const toast = useToast();

  const [user, setUser] = useState({
    email: '',
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

  const handleRequestPasswordReset = () => {
    const {email} = user;

    if (!email) {
      return showToast('Please fill in all details');
    }

    if (!isEmailValid(email)) {
      return showToast('Please enter a valid email');
    }

    requestPasswordReset(user.email).then(res => {
      if (res.error) {
        return showToast('This email does not exist');
      } else {
        return showToast('A reset password link has been sent to your email', {
          description: 'redirecting back to Home screen...',
          alignItems: 'center',
          backgroundColor: 'green.700',
          duration: 10000,
          onCloseComplete: () => navigation.popToTop(),
        });
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

          <Button
            leftIcon={
              <MaterialCommunityIcon
                name="email-receive-outline"
                color="white"
                size={20}></MaterialCommunityIcon>
            }
            borderRadius={30}
            marginTop={5}
            colorScheme={'info'}
            onPress={handleRequestPasswordReset}>
            Request Password Reset Link
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
