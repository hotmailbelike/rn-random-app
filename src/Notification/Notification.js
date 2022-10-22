import {StyleSheet} from 'react-native';
import {Container, Heading, Button, Text} from 'native-base';
import React from 'react';
import notifee from '@notifee/react-native';

const Notification = () => {
  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification to self',
      body: 'Hello! This is a message from myself from the past!',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <Container
      mt={20}
      alignSelf={'center'}
      width={'100%'}
      alignItems={'center'}>
      <Heading textAlign={'center'} fontSize={'xl'}>
        Send a Notification to yourself!
      </Heading>

      <Button
        marginTop={5}
        width={200}
        height={200}
        colorScheme={'red'}
        borderRadius={100}
        onPress={onDisplayNotification}>
        <Text fontSize={'3xl'} color={'white'}>
          Press Here!
        </Text>
      </Button>
    </Container>
  );
};

export default Notification;

const styles = StyleSheet.create({});
