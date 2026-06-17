
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./AuthSlice/authSlice"
import jwtSlice from "./JwtSlice/jwtSlice"
import NotificationSlice from "./NotificationTokenSlice/NotificationSlice"

export const store = configureStore({
    reducer :{
        authSlice : authSlice,
        jwtSlice : jwtSlice,
        NotificationSlice : NotificationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;