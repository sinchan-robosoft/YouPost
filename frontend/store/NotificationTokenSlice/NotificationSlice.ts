
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const NotificationSlice = createSlice({
    name : "NotificationSlice",
    initialState,
    reducers : {
        writeToToken : (state,action) => {
            state = action.payload;
        }
    }
});

export const {writeToToken} = NotificationSlice.actions;
export default NotificationSlice.reducer;