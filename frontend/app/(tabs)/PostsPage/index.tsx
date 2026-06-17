import NewPost from '@/components/NewPost/NewPost'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Posts = () => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 flex justify-center items-center'>
        <NewPost />
      </View>
    </SafeAreaView>
    
  )
}

export default Posts 