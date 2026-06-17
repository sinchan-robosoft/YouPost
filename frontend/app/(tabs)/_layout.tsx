import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { configureNotification } from '@/services/Notifications/configureNotification';
import { useDispatch, useSelector } from 'react-redux';
import { writeToToken } from '@/store/NotificationTokenSlice/NotificationSlice';
import AxiosInstance from '@/api/Axios/AxiosInstance';

export default function TabsLayout() {
  const dispatcher = useDispatch();
  const userName = useSelector((state : any) => state.authSlice.userName)
  useEffect(() => {
    const notification = configureNotification({});
    const configure = async () => {
      const { status } = await notification.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Notification permission denied');
        return;
      }
      const token = await notification.getExpoPushTokenAsync();
      console.log("from layout____")
      console.log(token)
      dispatcher(writeToToken(token));
      try{
        AxiosInstance.post("/saveNotificationToken",{
        notificationToken : token,
        userName : userName
      })
      }
      catch(err){
        console.log(err)
      }

      const foregroundSubscription = notification.addNotificationReceivedListener(notification => {
      console.log('Notification received (foreground):', notification.request.content.data);
      });
      
      const subscription = notification.addNotificationResponseReceivedListener(response => {
      console.log('Notification pressed:', response.notification.request.content.data);
      
    });
    }
    configure();
  },[])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
         tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,        
          shadowOpacity: 0,    
          shadowColor: 'transparent',
          position : "absolute"
        },
      }}
    >
      <Tabs.Screen
        
        name="HomePage/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="PostsPage/index"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ViewProfileScreen/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}