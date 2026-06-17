// services/navigationService.ts
import { router } from 'expo-router';
import { store } from '@/store/store';

// Define routes that need authentication
const PROTECTED_ROUTES : any = {
  "/HomePage": false,
  "/LoginPage": false,
  "/SignUpPage" : false,
  "/(tabs)" : true,
  "/ViewProfileScreen": true,
  "/BookmarksPage": true,
};

export const navigate = (routeName: any) => {
  const state = store.getState();
  const isLogged = state.authSlice.isLogged;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES[routeName];

  if (isProtectedRoute && !isLogged) {
    // Redirect to login if not authenticated
    router.push('/LoginPage');
    return;
  }

  // Navigate to the route
  router.push(routeName);
};

// For events
export const handleEvent = (event: any) => {
  if (event.eventType === "navigation") {
    navigate(event.routeName);
  }
};