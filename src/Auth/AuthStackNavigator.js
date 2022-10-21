import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ForgotPassword from './ForgotPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';
import {Button, ArrowBackIcon, Pressable, View} from 'native-base';

const Stack = createStackNavigator();

const AuthStackNavigator = props => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTransparent: true,
      headerTitleStyle: {
        color: 'transparent',
      },
    }}>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
    <Stack.Screen
      name="Sign In"
      component={SignIn}
      options={({navigation, route}) => ({
        headerLeft: () => (
          <Button variant={'unstyled'} onPress={() => navigation.goBack()}>
            <ArrowBackIcon size={'5'}></ArrowBackIcon>
          </Button>
        ),
      })}
    />
    <Stack.Screen
      name="Sign Up"
      component={SignUp}
      // options={{
      //   headerLeft:()=>
      // }}
    />
    <Stack.Screen
      name="Forgot Password"
      component={ForgotPassword}
      // options={{
      //   headerLeft:()=>
      // }}
    />
  </Stack.Navigator>
);

export default AuthStackNavigator;
