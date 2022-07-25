// Dependency
import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';

// Components 
import SignIn from './src/screens/SignIn'
import Loading from './src/components/Loading'

// Styles
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

      { fontsLoaded ? <SignIn /> : <Loading /> }
    </NativeBaseProvider>
  );
}