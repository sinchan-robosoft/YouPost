import { useCamera } from '@/hooks/Data/useCamera'
import { useDevicePhotos } from '@/hooks/Data/usePickImage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { Image, Pressable, View, Animated, ActivityIndicator, Text } from 'react-native'

const ImagePicker = ({ setSelectedImage }: any) => {
    const { takePhoto } = useCamera()
    const { pickImage, loading } = useDevicePhotos()

    const handleCameraClick = async () => {
        console.log('Camera pressed')
        const photo = await takePhoto()
        if (photo) {
            console.log('Photo taken:', photo)
            setSelectedImage({
                uri: photo.uri,
                id: photo.uri,
            })
        }
    }

    const handlePickImage = async () => {
        console.log('Gallery pressed')
        const photo = await pickImage()
        if (photo) {
            console.log('Photo picked:', photo)
            setSelectedImage(photo[0])
        }
    }

    return (
        <View className='flex-1 flex flex-row gap-2 p-3 bg-white'>
            {/* Camera Button */}
            <Pressable
                onPress={handleCameraClick}
                disabled={loading}
                className='flex-1 bg-blue-500 rounded-lg items-center justify-center'
            >
                {loading ? (
                    <ActivityIndicator color="#fff" size="large" />
                ) : (
                    <View className='items-center gap-2 py-4'>
                        <MaterialCommunityIcons
                            name="camera"
                            color="#fff"
                            size={40}
                        />
                        <Text className='text-white font-semibold text-sm'>
                            Camera
                        </Text>
                    </View>
                )}
            </Pressable>

            {/* Gallery Button */}
            <Pressable
                onPress={handlePickImage}
                disabled={loading}
                className='flex-1 bg-purple-500 rounded-lg items-center justify-center'
            >
                {loading ? (
                    <ActivityIndicator color="#fff" size="large" />
                ) : (
                    <View className='items-center gap-2 py-4'>
                        <MaterialCommunityIcons
                            name="image-multiple"
                            color="#fff"
                            size={40}
                        />
                        <Text className='text-white font-semibold text-sm'>
                            Gallery
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    )
}

export default ImagePicker