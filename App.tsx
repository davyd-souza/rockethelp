// DEPENDENCY
import React from 'react';

// COMPONENT 
import { NativeBaseProvider, StatusBar } from 'native-base';
import Loading from './src/components/Loading'

// STYLE
import { THEME } from './src/styles/theme'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

// ROUTE
import { Routes } from './src/routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      { fontsLoaded ? <Routes /> : <Loading /> }
    </NativeBaseProvider>
  );
}