import React, { useEffect, useState } from 'react'
import { View,Text, ImageBackground, Alert, Pressable } from 'react-native'
import TextBox from '../UI/TextBox/TextBox' 
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../UI/Button/Button' 
import { handleSignUp } from './Utils'
import {  userName } from '@/Types/HomePage/HomePageTypes'
import { useButtonClick } from '@/hooks/Data/useLogin'
import { useDispatch, useSelector } from 'react-redux';
import { writeLoginData } from '@/store/AuthSlice/authSlice' 
import { router } from 'expo-router'
import { navigate } from '@/Navigation/navigationService'
import { writeToJwt } from '@/store/JwtSlice/jwtSlice'

const _layout = () => {
    const [userName,setUserName] = useState<userName>("");
    const [userPass,setUserPass] = useState<userName>("");
    const [reTypePass,setReTypePass] = useState<userName>("");
    const dispatcher = useDispatch()
    const loginData = useButtonClick({
        queryKey: "SignUp",
        queryFn: () => handleSignUp({email : userName , password : userPass,reTypePass : reTypePass}),
        onSuccess: (data) => {
            console.log("Success:", data);
            if(data?.resData?.login){
                dispatcher(writeLoginData({isBoolean : true,userName : userName}))
                dispatcher(writeToJwt(data?.resData?.jwtToken))
                setUserName("");
                setUserPass("");
                setReTypePass("");
                Alert.alert("SignUp","SignUp successful")
                navigate("/HomePage");

            }else{
                Alert.alert("Invalid", "Invalid username or password");
            }
        },
        onError: (error) => {
            Alert.alert("Error", error.message || "Login failed");
            setUserPass("");
            setReTypePass("");
        }
    });

    const handleOnClick = () => {
        loginData.mutate()
    }   

  return (
    
        <SafeAreaView className='flex-1 '>
            <View className='flex flex-col items-center flex-1 h-screen w-screen bg-white'>
                <View className='flex-1 flex-col items-center justify-center h-full w-full gap-3'>
                    <Text className='text-4xl font-bold'>
                        Welcome 
                    </Text>
                    <Text className='text-lg font-bold '>
                        Sign Up. 
                    </Text>
                    <TextBox 
                        setterMethod={setUserName} 
                        value={userName} 
                        borderColor='border-blue-400 ' 
                        cursorColor='#000000'
                        rounded='rounded-lg' 
                        maxLength={50}
                        width='w-[80%]'
                        placeHolder='Email'
                    />
                    <TextBox 
                        setterMethod={setUserPass} 
                        value={userPass} 
                        borderColor='border-blue-400' 
                        cursorColor='#000000'
                        rounded='rounded-lg' 
                        maxLength={50}
                        isPassword = {true}
                        width='w-[80%]'
                        placeHolder='Password'
                    />
                     <TextBox 
                        setterMethod={setReTypePass} 
                        value={reTypePass} 
                        borderColor='border-blue-400' 
                        cursorColor='#000000'
                        rounded='rounded-lg' 
                        maxLength={50}
                        isPassword = {true}
                        width='w-[80%]'
                        placeHolder='Retype Password'
                    />
                    <Button
                        width='w-[80%]'
                        text='Sign Up'
                        padding='py-3 mt-4'
                        disabled = {false}
                        onClick={() => {
                            handleOnClick()
                    }}/>
                    {/* <Pressable className='cursor-pointer'>
                        <Text className='text-gray-600'>Forgot Password ? Reset.</Text>
                    </Pressable> */}
                    <Pressable onPress={() => {
                        navigate("LoginPage");
                    }} className='cursor-pointer'>
                        <Text className='text-gray-600'>Already have an account ? login.</Text>
                    </Pressable>
                </View>
                
            </View>
        </SafeAreaView>

   
    
  )
}

export default _layout