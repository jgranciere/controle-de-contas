import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Title from './src/components/Title';
import HomeScreen from './src/screens/HomeScreen/homeScreen';
import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './Navigation';


export default function App() {
  return (
    <>
    <StatusBar></StatusBar>
      <Navigation></Navigation>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101E2B',
    paddingTop: 80,
  },
});
