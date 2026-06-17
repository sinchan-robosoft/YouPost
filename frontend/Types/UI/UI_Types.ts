import React from "react";
import { InputModeOptions } from "react-native";

export type TextBoxType = {
    borderColor : string,
    cursorColor : string,
    rounded : string,
    textColor? : string,
    maxLength? : Number,
    inputType? : InputModeOptions,
    width? : string,
    height? : string,
    setterMethod : any, //React.Dispatch<React.SetStateAction>
    value : string,
    isPassword? : boolean,
    placeHolder : string
}

export type ButtonStyle = {
    buttonColor? : string,
    width? : string,
    height? : string,
    borderRadius? : string,
    text? : string,
    textColor? : string,
    padding? : string,
    margin? : string,
    onClick : () => void,
    disabled? : boolean
}