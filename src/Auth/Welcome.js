import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Container, Center, Heading, Button} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Welcome = ({navigation}) => {
  return (
    <Center marginTop={20}>
      <Container alignItems={'center'}>
        <Heading>Welcome</Heading>
        <Container>
          <Button
            leftIcon={
              <MaterialCommunityIcon
                name="login"
                color="white"
                size={20}></MaterialCommunityIcon>
            }
            borderRadius={30}
            marginTop={5}
            colorScheme={'darkBlue'}
            onPress={() => {
              navigation.navigate('Sign In');
            }}
            width={200}>
            Sign In
          </Button>
          <Button
            leftIcon={
              <MaterialCommunityIcon
                name="account-plus"
                color="white"
                size={20}></MaterialCommunityIcon>
            }
            borderRadius={30}
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
