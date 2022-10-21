import {StyleSheet} from 'react-native';
import {Text, View, Button} from 'native-base';
import React, {useContext} from 'react';
import {AuthContext} from '../Auth/AuthProvider';

const Notification = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Notification</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
