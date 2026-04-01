import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Map() {
  return (
    <View className="flex-1 bg-branco">
      <View className="flex-1 m-4 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
        <WebView 
          source={require('../../assets/map.html')} 
          style={{ flex: 1 }}
          containerStyle={{ borderRadius: 24 }}
        />
      </View>
    </View>
  );
}