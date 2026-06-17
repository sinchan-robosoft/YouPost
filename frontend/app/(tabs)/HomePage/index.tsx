import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { router, useLocalSearchParams } from "expo-router"
import Button from '../../UI/Button/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeCard from '@/components/Cards/HomeCard'
import { FlatList } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/api/Axios/AxiosInstance'
import { getHomeData } from './utils'
import {store} from "../../../store/store"
import { useSelector } from 'react-redux'


const GuessGame = () => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getHomeData1"],
    queryFn: () => getHomeData(),
    staleTime: 3600000, 
  });
  const token = useSelector((state : any) => state.jwtSlice.token)
  useEffect(()=> {
      console.log("from home page")
      console.log(token)
  },[data])
  return (
    <SafeAreaView className='flex-1 '>
      <View className='w-screen h-screen flex justify-center items-center gap-4 flex-1 bg-white p-0 m-0'>
        {<FlatList 
          className='h-full p-0 m-0'
          data={data?.data?.posts}
          renderItem={({ item, index }) => <HomeCard data={item}  />}
          keyExtractor={(item, index) => index.toString()}
        />}
        
       
    </View>
    </SafeAreaView>
    
  )
}

export default GuessGame