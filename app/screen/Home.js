import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

const HomeScreen = () => {
  firebase.initializeApp();

  const onDisplayForegroundNotification = async (title, body, imageUrl) => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        largeIcon: imageUrl,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      },
      importance: AndroidImportance.HIGH,
    });
  };

  // show pop-up notification if the app in foreground state
  messaging().onMessage((remoteMessage) => {
    console.log(remoteMessage);
    const {body, title} = remoteMessage.notification;
    const {imageUrl} = remoteMessage.notification.android;

    onDisplayForegroundNotification(title, body, imageUrl);
  });

  messaging().setBackgroundMessageHandler((remoteMessage) => {
    console.log('app is in background state');
    console.log(remoteMessage);
  });

/*   const onDisplayNotification = async () => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        largeIcon:
          'https://kade-bucket.s3.ap-south-1.amazonaws.com/photo_5f8d6b6c10597d08189d1c76.jpg',
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      },
      importance: AndroidImportance.HIGH,
    });
  }; */

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {/* <Button
        title="Show Notification"
        onPress={() => onDisplayNotification()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
