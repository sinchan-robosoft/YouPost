import { TextBoxType } from '@/Types/UI/UI_Types'
import React, { useState } from 'react'
import { TextInput, View } from 'react-native'

const TextBox = ({setterMethod,placeHolder,value,borderColor,cursorColor,rounded,isPassword = false, textColor = "text-white" , maxLength = 10,inputType = "text",width = "w-1/2",height = "h-12"} : TextBoxType) => {
  return (
    <View className={`border border-t border-r ${borderColor} ${width} ${height} ${rounded}`}>
        <TextInput 
            keyboardType='default'
            placeholder={placeHolder}
            inputMode={inputType}
            maxLength={Number(maxLength)} 
            cursorColor={cursorColor} 
            className={`${textColor} p-3`}
            onChangeText={(t) => setterMethod(t)}
            value={value}
            secureTextEntry={isPassword}
            style={{color : "#000000"}}
            />
    </View>
  )
}

export default TextBox;