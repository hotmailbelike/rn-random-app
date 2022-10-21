import {StyleSheet} from 'react-native';
import {
  Container,
  FormControl,
  Heading,
  Button,
  Stack,
  Input,
} from 'native-base';

import React from 'react';

const SignIn = ({navigation}) => {
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
          <Input type="email" placeholder="Enter Email" />
        </Stack>
      </FormControl>
      <FormControl marginTop={3}>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" defaultValue="" placeholder="Enter Password" />
        </Stack>
      </FormControl>
      <Button marginTop={5} width={'50%'} colorScheme={'darkBlue'}>
        Sign in
      </Button>

      <Button
        onPress={() => navigation.navigate('Forgot Password')}
        marginTop={2}
        width={'50%'}
        variant={'unstyled'}
        colorScheme={'primary'}>
        Forgot Password?
      </Button>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
