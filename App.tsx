import { NativeBaseProvider } from 'native-base';
import React from 'react';

// Components 
import SignIn from './src/screens/SignIn'

// Styles
import { THEME } from './src/styles/theme'


export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <SignIn/>
    </NativeBaseProvider>
  );
}