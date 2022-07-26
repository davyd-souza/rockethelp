// DEPENDENCY
import React from 'react';

// COMPONENT 
import { NativeBaseProvider, StatusBar } from 'native-base';
import Home from './src/screens/Home'
import Loading from './src/components/Loading'

// STYLE
import { THEME } from './src/styles/theme'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      { fontsLoaded ? <Home /> : <Loading /> }
    </NativeBaseProvider>
  );
}