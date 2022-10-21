import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {NativeBaseProvider, ColorMode} from 'native-base';

import SplashScreen from 'react-native-splash-screen';
import AuthStackNavigator from './src/Auth/AuthStackNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthStackNavigator></AuthStackNavigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
