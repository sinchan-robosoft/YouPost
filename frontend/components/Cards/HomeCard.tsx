import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { convertDateToPresent,handleEvent } from './HomeCardsUtils'
import { useSelector } from 'react-redux'
import { navigate } from '@/Navigation/navigationService'
import { IconButton } from 'react-native-paper'

const HomeCard = ({ data }: any) => {
  const isLogged = useSelector((state : any) => state.authSlice.isLogged)
  const [liked,setLiked] = useState(false)
  const [saved,setSaved] = useState(false)
  return (

    <View className='w-full bg-white mb-4 shadow-lg'>
      <View className='flex-row items-center justify-between px-4 py-3'>
        <View className='flex-row items-center gap-3'>
          <Image
            source={{
              uri: data?.author?.coverImage?.url ||
                require("../../assets/images/react-logo.png")
            }}
            className='w-10 h-10 rounded-full'
          />
          <View>
            <Text onPress={() => navigate("/ViewProfileScreen")} className='font-semibold text-black'>{data?.author?.firstName}</Text>
            <Text className='text-xs text-gray-500'>{convertDateToPresent(data?.author?.updatedAt)}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text className='text-2xl text-gray-800'>⋯</Text>
        </TouchableOpacity>
      </View>

      <View className='w-full aspect-square bg-gray-300 overflow-hidden'>
        <Image
          source={{ uri: data?.images?.[0]?.url || "https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg" }}
          className='w-full h-full'
          resizeMode="cover"
        />
      </View>


      <View className='flex-row justify-between px-4 py-3 border-b border-gray-200'>
        <View className='flex-row gap-4'>
          <TouchableOpacity>
            {/* <Text className='text-2xl'>♡</Text> */}
            <IconButton 
              icon="heart"
              size={28}                    
              iconColor={`${liked ? "red" : "gray"}`}              
              onPress={() => {console.log('Pressed');setLiked(!liked)}}
              style={{ margin: 0 }}        
              animated={true}              
              disabled={false}             
            />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* <Text className='text-2xl'>💬</Text> */}
            <IconButton 
              icon="comment-outline"
              size={28}                    
              iconColor="black"              
              onPress={() => console.log('Pressed')}
              style={{ margin: 0 }}        
              animated={true}              
              disabled={false}             
            />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* <Text className='text-2xl'>📤</Text> */}
            <IconButton 
              icon="share-outline"
              size={28}                    
              iconColor="black"              
              onPress={() => console.log('Pressed')}
              style={{ margin: 0 }}        
              animated={true}              
              disabled={false}             
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          {/* <Text className='text-2xl'>🔖</Text> */}
          <IconButton 
              icon={`${saved ? "bookmark" : "bookmark-outline"}`}
              size={28}                    
              iconColor="black"              
              onPress={() => {console.log('Pressed');setSaved(!saved)}}
              style={{ margin: 0 }}        
              animated={true}              
              disabled={false}             
            />
        </TouchableOpacity>
      </View>

      {/* Likes Count */}
      <View className='px-4 pt-2'>
        <Text className='font-semibold text-black'>{data?.likes} likes</Text>
      </View>

      {/* Caption */}
      <View className='px-4 py-2'>
        <Text
          className='text-black'
          numberOfLines={1}
        >
          <Text className='font-semibold'>{data?.author?.firstName}</Text>
          {' '}{data?.content}
        </Text>
      </View>

      {/* Comments Preview */}
      <TouchableOpacity className='px-4 py-2'>
        <Text className='text-gray-500 text-sm'>{data?.comments == "0" ? "No comments" : `View all ${data?.comments} comments`}</Text>
      </TouchableOpacity>

      {/* Timestamp */}
      {/* <View className='px-4 pb-3'>
        <Text className='text-gray-400 text-xs'>2 HOURS AGO</Text>
      </View> */}
    </View>

  )
}

export default HomeCard