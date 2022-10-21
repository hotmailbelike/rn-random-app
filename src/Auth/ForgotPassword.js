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

const ForgotPassword = () => {
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
          <Input type="email" placeholder="Enter Email" />
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
      <Button marginTop={5} width={'50%'} colorScheme={'darkBlue'}>
        Reset Password
      </Button>
    </Container>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
