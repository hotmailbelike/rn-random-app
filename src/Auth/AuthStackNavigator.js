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
    <Stack.Screen name="Sign In" component={SignIn} />
    <Stack.Screen name="Sign Up" component={SignUp} />
    <Stack.Screen name="Forgot Password" component={ForgotPassword} />
  </Stack.Navigator>
);

export default AuthStackNavigator;
