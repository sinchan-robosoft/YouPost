import { ButtonStyle } from '@/Types/UI/UI_Types';
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const Button = ({onClick,disabled = false,text = "Click Me!!",height = "h-12",width = "w-1/2",borderRadius = "rounded-lg",buttonColor = "bg-blue-700",textColor = "text-white",margin = "m-0",padding = "p-0"} : ButtonStyle) => {
  return (
    <Pressable disabled = {disabled} onPress={() => onClick()} className={`${height+" "+width+ " "+borderRadius+ " "+buttonColor+ " "+padding+" " + margin}`}>
        <Text className={`${textColor} text-center`}>
            {
                text
            }
        </Text>
    </Pressable>
  )
}

export default Button;