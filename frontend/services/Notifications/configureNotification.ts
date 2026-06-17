import { configureNotificationType } from '@/Types/Services/ConfigureNotification/configureNotificationType';
import * as Notifications from 'expo-notifications';

export const configureNotification = ({
    shouldShowAlert = true,
    shouldPlaySound = true,
    shouldSetBadge = true,
    shouldShowBanner = true,  
    shouldShowList = true  
} : configureNotificationType) => {

    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: shouldShowAlert,
        shouldPlaySound: shouldPlaySound,
        shouldSetBadge: shouldSetBadge,
        shouldShowBanner: shouldShowBanner,  
        shouldShowList: shouldShowList,    
    }),
});

return Notifications;
}
