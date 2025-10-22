import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const DEFAULT_LOCATION = {
  latitude: -23.686,
  longitude: -46.627
}
const App: React.FC = () => {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert('Error loading HTML', JSON.stringify(error));
        console.error('Error loading HTML:', error);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!webViewContent) {
    return <ActivityIndicator size="large" />
  }
  return (
    <LeafletView
      source={{ html: webViewContent }}
      mapCenterPosition={{
        lat: DEFAULT_LOCATION.latitude,
        lng: DEFAULT_LOCATION.longitude,
      }}
    />
  );
}

export default App;