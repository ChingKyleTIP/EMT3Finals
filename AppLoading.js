import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    // Add other font variants here if needed
  });
};

const AppLoadingScreen = ({ setAppReady }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true);
          setAppReady(true);
        }}
        onError={() => {}}
      />
    );
  }

  return null;
};

export default AppLoadingScreen;