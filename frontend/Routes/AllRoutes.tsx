import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const GetRoutes = () => {
  const isLogged = useSelector((state: RootState) => state.authSlice.isLogged);

  if (isLogged) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage/index" />
      <Stack.Screen name="SignUpPage/index" />
    </Stack>
  );
};

export default GetRoutes;