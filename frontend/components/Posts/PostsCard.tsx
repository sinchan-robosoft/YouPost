import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { getUSerPosts } from './utils';
import { useSelector } from 'react-redux';
import {File} from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const PostsCard = () => {
    const tempArr : any[] = [1,2,3,4,5];

    const userName = useSelector((state : any) => state.authSlice.userName)
    const [data,setData] = useState<any>([]);
    const fetchUSerPost = useMutation({
        mutationKey : ["fetchUserPosts"],
        mutationFn : () => getUSerPosts(userName),
        onSuccess : (data) => {
            const imagesArray : any[] = [];
            data?.data.forEach((elem : any) => {
                 const imageUri = `data:image/jpeg;base64,${elem?.file}`;
                imagesArray.push({file : imageUri,userLoc : elem.userLoc});
            });
            setData(imagesArray)
            
        }
    })
    useFocusEffect(
        useCallback(() => {
            fetchUSerPost.mutate();
        }, [])
    );

  return (
    <View className='flex-1 flex flex-row justify-start items-start flex-wrap gap-2'>
        {
            !fetchUSerPost.isPending &&
            data.map((item : any,index : any) => {
                console.log(item)
                return(
                    <View key={index} className='h-36 w-36 border border-white flex gap-2 flex-col'>
                        <Image className='w-full h-full' source={{uri : item?.file}} />
                        <Text className='text-black text-lg'>{item?.userLoc}</Text>
                    </View>
                )
            })
        }
        {
            fetchUSerPost.isPending && <Text className='text-white'>Loading....</Text>
        }
    </View>
  )
}

export default PostsCard