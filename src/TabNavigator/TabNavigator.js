import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';

const Tab = createBottomTabNavigator();

import Notification from '../Notification/Notification';
import Photo from '../Photo/Photo';
import Text from '../Text/Text';
import Calculator from '../Calculator/Calculator';

import {AuthContext} from '../Auth/AuthProvider';
import {Pressable} from 'native-base';

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
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name="Notes" component={Text} />
      <Tab.Screen name="Calculator" component={Calculator} />
      <Tab.Screen
        name="Sign Out"
        children={() => null}
        options={({navigation, route}) => {
          return {
            tabBarButton: props => (
              <Pressable {...props} onPress={signOut}></Pressable>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
