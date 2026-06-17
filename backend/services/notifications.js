const { Expo } = require('expo-server-sdk');

const sendNotification = async ({ title, body, to, data = {} }) => {
  const expo = new Expo();
  
  try {
    if (!Expo.isExpoPushToken(to)) {
      console.error('Invalid push token:', to);
      return { success: false, error: 'Invalid token' };
    }

    const notification = {
      to: to,
      sound: 'default',
      title: title,
      body: body,
      data: data,
      badge: 1,
    };
    const result = await expo.sendPushNotificationsAsync([notification]);
    
    console.log('Notification sent:', result);
    return { success: true, result };
  } catch (err) {
    console.error('Error sending notification:', err);
    return { success: false, error: err.message };
  }
};

module.exports = {sendNotification}