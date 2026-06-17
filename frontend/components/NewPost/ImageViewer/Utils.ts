import AxiosInstance from "@/api/Axios/AxiosInstance";
import { savePostType } from "@/Types/Components/ImageViewer/Types";
import {File} from "expo-file-system";
import { useSelector } from "react-redux";
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { configureNotification } from "@/services/Notifications/configureNotification";
import { Alert } from "react-native";


export const savePost = async ({ userName,postUrl , postCaption } : savePostType) =>{
    
  const notification = configureNotification({});
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Notification permission denied');
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
    
  const fileUri = postUrl.uri;

  const file = new File(fileUri)
  const formData = new FormData();

    
    
const userLoc : string = await requestUserLocation();

formData.append("userPost", {
uri: postUrl.uri,
name: file.name || "image.jpg",
type: file.type || "image/jpeg",
} as any);

formData.append("userName", userName);
formData.append("postCaption", postCaption);
formData.append("userLoc",userLoc);

const response = await AxiosInstance.post(
  "/saverUserPost",
  formData
);

return response.data;

}

const requestUserLocation = async () : Promise<string> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
        return "noLocation";
  }else{
    const currentLocation = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    });
    console.log(address)
    return address?.[0]?.city || "noLocation";
  }
}


//  formData.append("userPost",userName)
    //  formData.append("userPost",postCaption)
    //  formData.append("userPost",postCaption)
    //  console.log("from utils , method is hit")
    // const response = await AxiosInstance.post("/saverUserPost",{
    //     "formData" : JSON.stringify(formData)
    // },
    // {
    //     headers : {
    //         "Content-Type" : "multipart/form-data"
    //     }
    // });
    //const response = await AxiosInstance.post("/saverUserPost", formData);

    // console.log("api method hit")
    // const bytes = await file.bytes();
    // console.log(bytes);
    // console.log(file.name)
    // console.log(file.type)
    // const response = await AxiosInstance.post("/saverUserPost",{
    //     userName : userName,
    //     postCaption : postCaption,
    //     fileBytes : bytes,
    //     fileName : file.name,
    //     fileType : file.type
    // });
    // console.log(response.data)
    // return response.data;

    ///****************** */