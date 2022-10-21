import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Container, Center, Heading, Button} from 'native-base';

const Welcome = ({navigation}) => {
  return (
    <Center marginTop={20}>
      <Container alignItems={'center'}>
        <Heading>Welcome</Heading>
        <Container>
          <Button
            marginTop={5}
            onPress={() => {
              navigation.navigate('Sign In');
            }}
            width={200}>
            Sign In
          </Button>
          <Button
            marginTop={5}
            onPress={() => navigation.navigate('Sign Up')}
            width={200}>
            Sign Up
          </Button>
        </Container>
      </Container>
    </Center>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
