import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function useDevicePhotos() {
  const [photos, setPhotos] = <any>useState([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const pickImage = async () => {
    if (!hasPermission) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access photos is required!');
        return null;
      }
    }

    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        //allowsMultiple: true, // Enable multi-select
      });

      if (!result.canceled) {
        const selectedPhotos = result.assets.map(asset => ({
          uri: asset.uri,
          id: asset.uri, // Use URI as unique ID
          width: asset.width,
          height: asset.height,
        }));
        setPhotos(selectedPhotos);
        return selectedPhotos;
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { 
    photos, 
    loading, 
    hasPermission, 
    pickImage 
  };
}