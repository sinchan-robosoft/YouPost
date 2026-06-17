
import { createSlice } from "@reduxjs/toolkit";

const initialState : { token : string } = { token : "" } 

const jwtSlice = createSlice(
    {
        name : "jwtSlice",
        initialState,
        reducers : {
            writeToJwt : (state,action) => {
                state.token = action.payload;
            }
        }
    }
)

export const {writeToJwt} = jwtSlice.actions;
export default jwtSlice.reducer; 