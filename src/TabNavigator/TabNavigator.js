import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';

const Tab = createBottomTabNavigator();

import Notification from '../Notification/Notification';
import Photo from '../Photo/Photo';
import Text from '../Text/Text';
import Calculator from '../Calculator/Calculator';

import {AuthContext} from '../Auth/AuthProvider';
import {Pressable} from 'native-base';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const TabNavigator = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Notification"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTransparent: true,
        headerTitleStyle: {
          color: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={() => {
          return {
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcon name="notifications" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Photo"
        component={Photo}
        options={() => {
          return {
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcon name="photo" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Note"
        component={Text}
        options={() => {
          return {
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcon name="text-snippet" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={() => {
          return {
            tabBarIcon: ({focused, color, size}) => (
              <MaterialIcon name="calculate" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Sign Out"
        children={() => null}
        options={({navigation, route}) => {
          return {
            tabBarButton: props => (
              <Pressable {...props} onPress={signOut}></Pressable>
            ),
            tabBarIcon: ({size, color}) => (
              <MaterialIcon name="logout" size={size} color={color} />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
