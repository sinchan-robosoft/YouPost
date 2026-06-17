
import Button from '@/app/UI/Button/Button'
import PostsCard from '@/components/Posts/PostsCard'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { writeLoginData } from '@/store/AuthSlice/authSlice' 
import { writeToJwt } from '@/store/JwtSlice/jwtSlice'
import { useDispatch } from 'react-redux'
import { router } from 'expo-router'

const index = () => {
  const dispatcher = useDispatch();

  const handleLogout = () => {
    dispatcher(writeLoginData({userName : "",isBoolean : false}));
    dispatcher(writeToJwt({token : ""}));
    router.dismissAll();
    router.push("/LoginPage");
  }

  return (
    <SafeAreaView className='flex-1 flex flex-col gap-2'>
      <View className='p-0 flex items-center mt-2'>
            <Text className='font-bold text-2xl'>Your Posts</Text>
          </View>
         <View className='flex-1  p-2'>
            <PostsCard />
        </View>
        <View className='flex-1 flex items-center p-2'>
          <Button
            text='Logout'
            padding='p-1 absolute bottom-16 text-center bg-gray-400 active:bg-gray-600 hover:bg-gray-500 transition-all'
            height='h-8'
            width='w-full'
            onClick={handleLogout}
            
          />
        </View>
        
    </SafeAreaView>
   
  )
}

export default index