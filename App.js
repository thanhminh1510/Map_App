import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import { Home, Restaurants } from './src/screen';
import Navigation from './src/navigation/tabs';

const Stack = createStackNavigator();

const App = () => {

  return (
    <Navigation />
  )
}

export default App;