import React, {useEffect, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import SplashScreen from 'react-native-splash-screen';
import AuthStackNavigator from './Auth/AuthStackNavigator';
import TabNavigator from './TabNavigator/TabNavigator';
import {AuthContext} from './Auth/AuthProvider';

const Screens = () => {
  const {user, setUser} = useContext(AuthContext);

  const [authenticatingWithFirebase, setAuthenticatingWithFirebase] =
    useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (authenticatingWithFirebase) {
      setAuthenticatingWithFirebase(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    SplashScreen.hide();

    return subscriber;
  }, []);

  if (authenticatingWithFirebase) return null;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {user ? (
          <TabNavigator></TabNavigator>
        ) : (
          <AuthStackNavigator></AuthStackNavigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Screens;
