import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ForgotPassword from './ForgotPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';
import {Button, Text} from 'native-base';

const Stack = createStackNavigator();

const AuthStackNavigator = props => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
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
        headerStyle: {
          textAlign: 'center',
        },
        headerLeft: () => (
          <Button onPress={() => navigation.goBack()}>Back</Button>
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
