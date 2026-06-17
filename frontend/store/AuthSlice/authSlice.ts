
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLogged : false,
    userName : ""
};

const authSlice = createSlice(
    {
        name : "auth",
        initialState,
        reducers : {
            writeLoginData : (state,action : PayloadAction  <{isBoolean : boolean,userName : string}>) => {
                state.isLogged = action.payload.isBoolean,
                state.userName = action.payload.userName
            }
        }
    }
)

export const {writeLoginData} = authSlice.actions;
export default authSlice.reducer;