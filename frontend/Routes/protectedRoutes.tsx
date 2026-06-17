import { Stack } from "expo-router"

export const getProtectedRoutes = () => {
    return(
        <>
            <Stack.Screen name="ViewProfileScreen/index" options={{ headerShown: false }} />
        </>
    )
}