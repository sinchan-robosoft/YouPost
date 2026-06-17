import { Alert } from "react-native"
import { router } from "expo-router";
import { useReactQuery } from "@/react-query/queryTemplate";
import AxiosInstance from "@/api/Axios/AxiosInstance";

export const handleConfirm = (input: string) => {
    // try {
    //     //console.log(input)
    //     let a = Number(input);
    //     const valid = validateInput(a)
    //     if (valid) {
    //         router.push(
    //             {
    //                 pathname :"/GuessPage",
    //                 params : {
    //                     userInput : input
    //                 }
    //             })
    //     }
    //     else {
    //         Alert.alert("Alert", "Entred number is invalid");
    //     }
    // }
    // catch (err) {
    //     console.log(err)
    //     Alert.alert("Alert", "Entred number is not valid");
    // }
}

export const handleGuessClick = (input : string) => {
    try
    {
        let a = Number(input);
        const valid = validateInput(a)
        if(valid){
            Alert.alert("Alert","Entred number is "+ input);
        }
        else{
            Alert.alert("Alert","Entred number is invalid");
        }     
    }
    catch(err){
        Alert.alert("Alert","Entred number is not valid");
    }
}

const validateInput =  (input : number) : boolean => {
    let handled = false;
    if((!isNaN(input)) && input > 0 && input <=100){
        handled = !handled;
    }
    return handled;
}

export const handleLogin = async (userDetails: {
    userName: string;
    userPass: string;
}) => {
    const response = await AxiosInstance.post("/login", {
        userName: userDetails.userName,
        userPass: userDetails.userPass
    });
    return response.data;
};