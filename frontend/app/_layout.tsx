import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/use-color-scheme';
import "../global.css"
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {store} from "../store/store"
import { Provider, useSelector } from "react-redux"
import  GetRoutes  from '@/Routes/AllRoutes';

export const unstable_settings = {
  anchor: 'HomePage/index',
};

const queryClient = new QueryClient();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <PaperProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <GetRoutes />
            <StatusBar style="dark" />
          </QueryClientProvider>
      </Provider>
      </PaperProvider>
      
      
      
    </ThemeProvider>
    
  );
}
