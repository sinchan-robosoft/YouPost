
import React from 'react'
import { SafeAreaViewBase, Text, View } from 'react-native'
import ImageViewer from './ImageViewer/ImageViewer'
import ImagePicker from './ImagePicker/ImagePicker'

const NewPost = () => {
  return (
    
        <View className='flex-1 flex h-full w-full'>
           <ImageViewer />
           
        </View>
    
  )
}

export default NewPost