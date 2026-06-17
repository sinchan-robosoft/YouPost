import React, { useState, useEffect, useRef } from 'react'
import { Image, Pressable, Text, View, Animated, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ImagePicker from '../ImagePicker/ImagePicker'
import { useMutation } from '@tanstack/react-query'
import { savePost } from './Utils'
import { useSelector } from 'react-redux'

const ImageViewer = ({ onClose }: { onClose?: () => void }) => {
    const [selectedImage, setSelectedImage] = useState<any>({})
    const userName = useSelector((state: any) => state.authSlice.userName)
    
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(100)).current
    const scaleAnim = useRef(new Animated.Value(0.9)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    const saveUserPost = useMutation({
        mutationKey: ["saveUserPost"],
        mutationFn:  () => {
            return savePost({
                userName,
                postUrl: selectedImage,
                postCaption: "first Post"
            })
        },
        onSuccess: (data) => {
            console.log('Post saved:', data)
            setSelectedImage({})
            onClose?.()
        },
        onError: (error: any) => {
            console.log('Error:', error.message)
        }
    })

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 100,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setSelectedImage({})
            onClose?.()
        })
    }

    return (
    <View 
        className='flex-1 bg-white'
    >
        <View className='flex flex-row justify-between items-center px-4 py-4 border-b border-gray-200'>
            <Pressable 
                onPress={handleClose}
                className='p-2 active:bg-gray-100 rounded-full'
            >
                <MaterialCommunityIcons 
                    name="close" 
                    color="#000" 
                    size={24} 
                />
            </Pressable>

            <Text className='text-xl font-bold'>New Post</Text>

            <Pressable 
                onPress={() => saveUserPost.mutate()}
                disabled={!selectedImage.uri || saveUserPost.isPending}
                className={`px-4 py-2 rounded-full ${
                    selectedImage.uri 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                }`}
            >
                {saveUserPost.isPending ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text className='font-bold text-white text-base'>
                        Next
                    </Text>
                )}
            </Pressable>
        </View>

        <View 
            className='flex-1 bg-gray-100 justify-center items-center overflow-hidden'
        >
            {selectedImage.uri ? (
                <Image
                    source={{ uri: selectedImage.uri }}
                    className='h-full w-full'
                    resizeMode="cover"
                />
            ) : (
                <View className='justify-center items-center'>
                    <MaterialCommunityIcons 
                        name="image-outline" 
                        color="#999" 
                        size={64} 
                    />
                    <Text className='text-gray-400 mt-4 text-center'>
                        Select an image to continue
                    </Text>
                </View>
            )}
        </View>

        <View className='h-32 border-t border-gray-200 bg-white mb-12'>
            <ImagePicker setSelectedImage={setSelectedImage} />
        </View>
    </View>
)
}

export default ImageViewer